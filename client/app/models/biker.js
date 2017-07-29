import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  fullname: attr('string'),
  email: attr('string'),
  city: attr('string'),
  group_ride: attr('number'),
  days_week: attr('string')
});

BikerApp.Biker.FIXTURES = [{
    "fullname": "Cesar Augusto Nogueira",
    "email": "cesarnogueira1210@gmail.com",
    "city": "Campinas",
    "group_ride": 1,
    "days_week": "Sat,Sun"
  },
  {
    "fullname": "Erika Pinho Lemos",
    "email": "erika@gmail.com",
    "city": "Indaiatuba",
    "group_ride": 1,
    "days_week": "Sat,Sun"
  }
];