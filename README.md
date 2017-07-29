# Backend
## Starting Expressjs Bikers API

     cd server
     npm install  
     npm start

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
# Database (MongoDB)

## Starting MongoDB database

    C:\Program Files\MongoDB\Server\3.4\bin>mongod --dbpath C:\data\db

2017-07-27T20:11:39.527-0800 I CONTROL  [initandlisten] MongoDB starting : pid=8972 port=27017 dbpath=C:\data\db 64-bit host=DESKTOP-5A61EKB

2017-07-28T23:46:08.283-0300 I NETWORK  [thread1] waiting for connections on port **27017**
2017-07-28T23:46:08.323-0300 I NETWORK  [thread1] ***connection accepted from 127.0.0.1:23342 #1 (1 connection now open)***

# Frontend

## Starting Ember.JS Server to visualizer frontend

     cd client
     npm install  
     npm start


