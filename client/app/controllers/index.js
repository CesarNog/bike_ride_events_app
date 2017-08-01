import Ember from 'ember';

export default Ember.Controller.extend({
  headerMessage: 'Coming Soon',
  responseMessage: '',
  fullname: '',
  emailAddress: '',
  city: '',
  group_ride: 0,
  days_week: '',

  isEmailValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isDisabled: Ember.computed.empty('emailAddress'),
  isDeleteAllDisable: true,

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

    saveNewBiker() {
      var newPost = this.store.createRecord('biker', {
        fullname: 'EmberFire is flaming hot!',
        body: 'You can store and sync data in realtime without a backend.'
      });
      newPost.save();
    },

    cancel() {
       this.set('fullname', '');
       this.set('emailAddress', '');
       this.set('city', '');
       this.set('group_ride', '');
       this.set('days_week', '');
    },

    generateDummyList() {
      for (let i = 1; i <= 5; i++) {
        const newBiker = this.store.createRecord('biker', {fullname: `Dummy Name ${i}` , email: `${i}-1234-${i}`});
        newBiker.save();
      }
    },

    deleteAll() {
      if (this.get('biker') != undefined){
          this.get('biker').forEach(item => item.destroyRecord());
      }
    }
  }
});
