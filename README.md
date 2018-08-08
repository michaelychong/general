# Hoover Project
## Description
```
This is a Hoover review app. Given room dimensions, starting coordinates, 
dirt spot coordinates, and a random set of directions this app will return 
exactly how successful our hoover was in eliminating the mess.

I used an Ionic framework with the goal of scalability, cross mobile-platform 
support, and hope of adding in UI elements into the application at a later point 
(I didn't get to it for this exercise unfortunately). 

These considerations for expansion are the reason for some variable artifacts
that aren't entirely necessary for the 2 lin output requested in the coding prompt. 
At this time, the app supports file upload and repeated cleaning simulations.
```
## Resources
```
Used cmd - 'ionic start general blank' to build base app scaffold
Imported lodash for clone and split functions
```
## Command Line Prompts to Run
```
# Get latest code snapshot
git clone www.github.com/michaelychong/general.git michaelhoover
# Install Ionic
npm install -g ionic@3.20.0 cordova@7.1.0
# Set Directory
cd michaelhoover
# Install NPM Dependencies
npm install
# Launch Local App
ionic serve -l

# These steps should launch a webpage with a rendered mobile app view.
```
