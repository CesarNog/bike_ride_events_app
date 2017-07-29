# Project Bike Ride Events by @cesarnogcps

# Table of Contents
1. [Backend](#backend)
2. [Database](#database)
3. [Frontend](#frontend)


## Backend
### Starting Expressjs Bikers API

     cd server
     npm install  
     npm start

#### Example of succesfull API running

    npm start

> bike_ride_events_server@0.1.0 start C:\Users\Cesar\Desktop\entrevistaVenturus\bike_ride_events_app\server
> nodemon ./bin/www
28 Jul 22:13:20 - [nodemon] v1.3.8
28 Jul 22:13:20 - [nodemon] to restart at any time, enter `rs`
28 Jul 22:13:20 - [nodemon] watching: *.*
28 Jul 22:13:20 - [nodemon] starting `node ./bin/www`

### API Bikers - End Point
> http://localhost:3000/api/bikers

#### Header Parameters
> Content-Type  application/json

### Request body to create(POST) biker entry
    {
     "biker": {
      "fullname": "Cesar Augusto Nogueira",
      "email": "bikerCesar@email.com",
      "city": "Campinas",
      "groupRide": 1,
      "daysWeek": "Mon,Tues,Wed,Thurs,Fri,Sat,Sun"
      }
    }

----------
## Database

### Starting MongoDB database

    C:\Program Files\MongoDB\Server\3.4\bin>mongod --dbpath C:\data\db

2017-07-27T20:11:39.527-0800 I CONTROL  [initandlisten] MongoDB starting : pid=8972 port=27017 dbpath=C:\data\db 64-bit host=DESKTOP-5A61EKB

2017-07-28T23:46:08.283-0300 I NETWORK  [thread1] waiting for connections on port **27017**
2017-07-28T23:46:08.323-0300 I NETWORK  [thread1] ***connection accepted from 127.0.0.1:23342 #1 (1 connection now open)***

## Frontend

### Starting Ember.JS Server to visualizer frontend

     cd client
     npm install  
     npm start

#### Example of succesfull EmberJS server running

    /bike_ride_events_app/client
    npm start
    
    bike_ride_events_client@0.1.0 start C:\Users\Cesar\Desktop\entrevistaVenturus\bike_ride_events_app\client
    ember server
    
    Looks like you have a different program called watchman.
    Visit https://ember-cli.com/user-guide/#watchman for more info.
    
    Running without permission to symlink will degrade build performance.
    See http://ember-cli.com/user-guide/#windows for details.
    
    DEPRECATION: Addon files were detected in `C:/Users/Cesar/Desktop/entrevistaVenturus/bike_ride_events_app/client/node_modules/ember-flex-grid/addon`, but no JavaScript preprocessors were found for `ember-flex-grid`. Please make sure to add a preprocessor (most likely `ember-cli-babel`) to in `dependencies` (NOT `devDependencies`) in `ember-flex-grid`'s `package.json`.
    Livereload server on http://localhost:49153
    'instrument' is imported from external module 'ember-data/-debug' but never used
    
    Build successful (7516ms) – Serving on http://localhost:999/
