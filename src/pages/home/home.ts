import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  startButtonDisabled: boolean = true;
  haveCleaned: boolean = false;
  textDataArray = [];
  roomSize = {x: 0, y: 0};
  startPosition = {x: 0, y: 0};
  dirtSpots: Array<Object> = [];
  movementInstructions = [];
  currentPosition = {x: 0, y: 0};
  endPosition = {x: 0, y: 0};
  dirtCleanedCount = 0;
  printDescription: String;
  movementCount = 0;

  constructor(
    private http: Http,
  ) {
  }

  /* 
  Gets data from uploaded text file and splits it into an array items 
  based on line break.
  */
 getDataFromTextFile(event) {
  let file = event.target.files[0];
  if(file && file.name.indexOf("txt") > -1) {
    let reader = new FileReader();
    reader.onload = () => {
      this.textDataArray = _.split(reader.result, '\n');
      this.startButtonDisabled = false;
    };
    reader.readAsText(file);
  } else {
    this.startButtonDisabled = true;
  }
 }

  /* 
  Executed on Start Cleaning button click. Calls other functions 
  to execute cleaning program.
  */
  startProgram() {
    this.initializeObjects();
    this.currentPosition = _.clone(this.startPosition);
    if(this.isDirty()){this.dirtCleanedCount++};
    this.haveCleaned = true;
    this.makeMovements();
    this.endPosition = this.currentPosition;
    this.printDescription = 'The hoover started at the x: ' + this.startPosition.x + ' y: ' + this.startPosition.y + ' position. It made ' + this.movementCount + ' movements and bumped into a wall ' + (this.movementInstructions.length - this.movementCount) + ' times. It and cleaned ' + this.dirtCleanedCount + ' dirty spot(s), and ended at the x: ' + this.endPosition.x + ' y: ' + this.endPosition.y + ' position.';
  }

  /* 
  Called from the startProgram function. Takes the array of data from 
  the text file and generates the appropriate objects for the movement 
  function to read.
  */
  initializeObjects() {
    for(let i = 0; i < this.textDataArray.length; i++) {
      if(i === 0) {
        let roomSizeArray = _.split(this.textDataArray[i], ' ');
        this.roomSize.x = parseInt(roomSizeArray[0]);
        this.roomSize.y = parseInt(roomSizeArray[1]);
      } else if (i === 1) {
        let startPositionArray = _.split(this.textDataArray[i], ' ');
        this.startPosition.x = parseInt(startPositionArray[0]);
        this.startPosition.y = parseInt(startPositionArray[1]);
      } else if (i === (this.textDataArray.length - 1)) {
        this.movementInstructions = _.split(this.textDataArray[i], '');
      } else {
        let dirtSpot = {x: 0, y: 0};
        let dirtSpotArray = _.split(this.textDataArray[i], ' ');
        dirtSpot.x = parseInt(dirtSpotArray[0]);
        dirtSpot.y = parseInt(dirtSpotArray[1]);
        this.dirtSpots.push(dirtSpot);
      }
    }
  }

  /* 
  Called from the startProgram function. Takes the array of movements 
  and checks the movement can be made and if the tile being moved to 
  needs cleaning.
  */
  makeMovements() {
    for(let movement of this.movementInstructions) {
      if(this.canMove(movement)) {
        this.movementCount++;
        if(this.isDirty()) {
          this.dirtCleanedCount++;
        }
      }
    }
  }

  /* 
  Called from the makeMovements function. Checks whether the hoover 
  can make the next movement based on the room size and it's current 
  position
  */
  canMove(direction) {
    switch(direction) {
      case "N":
        if((this.currentPosition.y + 1) < this.roomSize.y) {
          this.currentPosition.y ++;
          return true;
        } else {
          return false;
        };
      case "S":
        if(this.currentPosition.y - 1 >= 0) {
          this.currentPosition.y --;
          return true;
        } else {
          return false;
        };
      case "E":
        if((this.currentPosition.x + 1) < this.roomSize.x) {
          this.currentPosition.x ++;
          return true;
        } else {
          return false;
        };
      case "W":
        if(this.currentPosition.x - 1 >= 0) {
          this.currentPosition.x --;
          return true;
        } else {
          return false;
        };
    }
  }

  /* 
  Called from the makeMovements function. Checks whether the tile 
  being moved to is dirty. If it is dirty, cleans the tile and removes 
  the locations from the dirt spots array.
  */
  isDirty() {
    for(let i = 0; i < this.dirtSpots.length; i++) {
      if(_.isEqual(this.dirtSpots[i],this.currentPosition)) {
        this.dirtSpots.splice(i,1);
        return true;
      }
    }
  }
/* 
Resets screen state and stored variables to upload file and start cleaning again.
*/
cleanAgain() {
  this.startButtonDisabled = true;
  this.textDataArray = [];
  this.dirtCleanedCount = 0;
  this.movementCount = 0;
  this.haveCleaned = false;
}
}
