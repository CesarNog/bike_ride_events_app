import Ember from 'ember';

export default Ember.Controller.extend({
  headerMessage: 'Coming Soon',
  responseMessage: '',
  emailAddress: '',

  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isDisabled: Ember.computed.empty('emailAddress'),

  actualEmailAddress: Ember.computed('emailAddress', function () {
    console.log('actualEmailAddress function is called: ', this.get('emailAddress'));
  }),

  emailAddressChanged: Ember.observer('emailAddress', function () {
    console.log('observer is called', this.get('emailAddress'));
  }),

  actions: {

    saveInvitation() {
      var _that = this;
      const email = this.get('emailAddress');

      const newInvitation = this.store.createRecord('invitation', {
        email: email
      });
      newInvitation.save().then(function (response) {
        _that.set('responseMessage', "Thank you! We saved your email address with the following id: " + response.get('id'));
        _that.set('emailAddress', '');
      });
    },

    savePost() {
      var newPost = this.store.createRecord('post', {
        title: 'EmberFire is flaming hot!',
        body: 'You can store and sync data in realtime without a backend.'
      });
      newPost.save();
    },

    generateDummyList() {
      for (let i = 1; i <= 5; i++) {
        const newBiker = this.store.createRecord('biker', {fullname: `Dummy Name ${i}` , email: `${i}-1234-${i}`});
        newBiker.save();
      }
    },

    deleteAll() {
      this.get('model').forEach(item => item.destroyRecord());
    }
  }
});
