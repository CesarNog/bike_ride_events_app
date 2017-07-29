## Start Expressjs Phonebook API
1. cd server
2. npm install  
3. npm start

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
  "groupRide": 1,
  "daysWeek": "Mon,Tues,Wed,Thurs,Fri,Sat,Sun"
  }
}
