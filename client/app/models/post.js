import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string')
});

var newPost = this.store.createRecord('post', {
  title: 'EmberFire is flaming hot!',
  body: 'You can store and sync data in realtime without a backend.'
});
newPost.save();
