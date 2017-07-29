import DS from 'ember-data';

export default DS.Model.extend({
  fullname: DS.attr('string'),
  email: DS.attr('string'),
  city: DS.attr('string'),
  group_ride: DS.attr('number'),
  days_week: DS.attr('string')
});
