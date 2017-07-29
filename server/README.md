## Start Expressjs Biker API
1. cd server
2. npm install  
3. npm start

## Easier way to start the backend API
1. cd server && gulp watch

#### It will open http://localhost:5000/api

## API End Point
http://localhost:3000/api/bikers

## Header Parameters
Content-Type  application/json

## Request body to create(POST) biker entry
{
 "biker": {
  "fullname": "Cesar Augusto Nogueira",
  "email": "bikerCesar@email.com",
  "city": "Campinas",
  "group_ride": 1,
  "days_week": "Mon,Tues,Wed,Thurs,Fri,Sat,Sun"
  }
}
