# Bike Ride Events by [@cesarnogcps](http://twitter.com/cesarnogcps)

# Table of Contents
1. [Starting this application](#starting-the-application)
2. [Backend](#backend)
3. [Database](#database)
4. [Frontend](#frontend)

## Starting the application
     1. Start MongoDB on port 27017 
>  Instructions of how to install MongoDB on Windows:
>  http://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows 

	mongod --dbpath C:\data\db
     
     2. Start Node.JS API, it will be visible on port 3000
 	cd server && npm install && gulp watch
     
     3. Start the frontend client (Ember.JS) , it will be visible on port 4200
 	cd client && npm start

## Backend
### Starting Expressjs Bikers API

     cd server
     npm install  
     npm start

### Faster way of starting Expressjs with Browserfy on port 5000

     cd server && npm install && gulp watch
     

#### Example of succesfull API running

    npm start
    
    > bike_ride_events_server@0.1.0 start C:\Users\Cesar\Desktop\entrevistaVenturus\bike_ride_events_app\server
    > nodemon ./bin/www
    28 Jul 22:13:20 - [nodemon] v1.3.8
    28 Jul 22:13:20 - [nodemon] to restart at any time, enter `rs`
    28 Jul 22:13:20 - [nodemon] watching: *.*
    28 Jul 22:13:20 - [nodemon] starting `node ./bin/www`

#### Example of succesfull API running
    gulp watch

    [02:18:01] Using gulpfile \bike_ride_events_app\server\gulpfile.js
    [02:18:01] Starting 'nodemon'...
    [02:18:01] [nodemon] 1.11.0
    [02:18:01] [nodemon] to restart at any time, enter `rs`
    [02:18:01] [nodemon] watching: *.*
    [02:18:01] [nodemon] starting `node bin/www`
    [02:18:01] Finished 'nodemon' after 142 ms
    [02:18:01] Starting 'watch'...
    [02:18:01] Finished 'watch' after 61 ms
    [Browsersync] Proxying: http://localhost:3000
    [Browsersync] Access URLs:
     --------------------------------------
           Local: http://localhost:5000/api
        External: http://10.0.75.1:5000/api
     --------------------------------------
              UI: http://localhost:3003
     UI External: http://10.0.75.1:3003

### API Bikers - End Point
> http://localhost:3000/api/bikers

#### Header Parameters
> Content-Type  application/json

### API REST - Biker API 
 
Route | HTTP Verb | Description |
----- | ---- | ---- 
 /api/bikers | POST | Create a biker     |  
 /api/bikers | GET  | Get all the bikers |
 /api/bikers/:biker_id | GET | Get a single biker   |
 /api/bikers/:biker_id | PUT | Update a single biker    |
 /api/bikers/:biker_id | DELETE | Delete a single biker  |
 
 ### Request body (POST) to create a new biker entry
    {
     "biker": {
      "fullname": "Cesar Augusto Nogueira",
      "email": "bikerCesar@email.com",
      "city": "Campinas",
      "group_ride": 1,
      "days_week": "Mon,Tues,Wed,Thurs,Fri,Sat,Sun"
      }
    }
 
### API REST - User API 
 
Route | HTTP Verb | Description |
----- | ---- | ---- 
 /api/users | POST | Create a user     |  
 /api/users | GET  | Get all the users registered |
 /api/users/:user_id | GET | Get a single user   |
 /api/users/:user_id | PUT | Update a single user    |
 /api/users/:user_id | DELETE | Delete a single user  |
 /api/create | GET | Create ADMIN user (login: admin / password: admin2017) |
 
 ### Request body (POST) to create a new user entry
	{
	"user": {
	 "name": "Cesar A. Nogueira",
	 "login": "cesarnogueira1210@gmail.com",
	 "password": "cesar123",
	 "admin": 0      
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
     bower install
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

    Livereload server on http://localhost:49153
    'instrument' is imported from external module 'ember-data/-debug' but never used
    
    Build successful (7516ms) – Serving on http://localhost:4200/

### Frontend access
> http://localhost:4200/

## Further Reading / Useful Links for Frontend
* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)

* UI Components used
  * [ember bootstrap](http://www.ember-bootstrap.com/) 
  
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
  

License
-------

MIT
