import Ember from 'ember';

//app/routes/posts/index.js
export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('post');
  }
});