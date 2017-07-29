import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let BikerApp;

Ember.MODEL_FACTORY_INJECTIONS = true;

BikerApp = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  LOG_TRANSITIONS: true,
  Resolver
});

loadInitializers(BikerApp, config.modulePrefix);

BikerApp.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id'
});

BikerApp.ApplicationAdapter = DS.RESTAdapter.extend({
  //namespace: 'api'
});


BikerApp.Store = DS.Store.extend({
  adapter: 'App.ApplicationAdapter'
});

DS.RESTAdapter.reopen({
  host: 'http://localhost:3000/api'
});


BikerApp.Biker = DS.Model.extend({
  firstname: DS.attr('string'),
  lastname: DS.attr('string'),
  phonenumber: DS.attr('string')

});

BikerApp.BikersIndexRoute = Ember.Route.extend({

  setupController: function (controller) {

    var bikers = this.get('store').find('biker'); // App.Phonebook.find();
    controller.set('content', bikers);
  },

  renderTemplate: function () {
    this.render('bikers.index', {
      into: 'application'
    });
  }

});

BikerApp.BikersEditRoute = Ember.Route.extend({

  setupController: function (controller, model) {
    this.controllerFor('bikers.edit').setProperties({
      isNew: false,
      content: model
    });
  },

  renderTemplate: function () {
    this.render('bikers.edit', {
      into: 'application'
    });
  }

});

BikerApp.PhonebooksNewRoute = Ember.Route.extend({
  setupController: function (controller, model) {
    var newPhonebook = this.store.createRecord('phonebook', {});
    this.controllerFor('bikers.edit').setProperties({
      isNew: true,
      content: newPhonebook
    });
  },
  renderTemplate: function () {
    this.render('bikers.edit', {
      into: 'application'
    });
  }

});

BikerApp.BikersEditController = Ember.ObjectController.extend({
  updateItem: function (biker) {
    biker.save();
    this.get("target").transitionTo("bikers");
  },

  isNew: function () {
    console.log("calculating isNew");
    return this.get('content').get('id');
  }.property()


});


BikerApp.PhonebooksIndexController = Ember.ArrayController.extend({

  editCounter: function () {
    return this.filterProperty('selected', true).get('length');
  }.property('@each.selected'),

  itemsSelected: function () {
    return this.get("editCounter") > 0;
  }.property('editCounter'),

  removeItem: function (phonebook) {
    phonebook.on("didDelete", this, function () {
      console.log("record deleted");
    });

    phonebook.destroyRecord();
  },

  removeSelectedPhonebooks: function () {
    arr = this.filterProperty('selected', true);
    if (arr.length == 0) {
      output = "nothing selected";
    } else {
      output = "";
      for (i = 0; i < arr.length; i++) {
        arr[i].destroyRecord()
      }
    }
  },

  phonebooksPresent: function () {

    var itemsPresent = this.get('content').get('length') > 0;
    console.log(" +++ Computed phonebooksPresent prop with value " + itemsPresent);
    return itemsPresent;
  }.property("content.@each")
  //}.property("content.isLoaded")
});

Ember.Handlebars.registerBoundHelper('locsPresent',
  function (myBinding, options) {
    console.log(myBinding);
    console.log(options);
    return true;
  }
);

BikerApp.NavView = Ember.View.extend({
  tagName: 'li',
  classNameBindings: ['active'],

  didInsertElement: function () {
    this._super();
    this.notifyPropertyChange('active');
    var _this = this;
    this.get('parentView').on('click', function () {
      _this.notifyPropertyChange('active');
    });
  },

  active: function () {
    return this.get('childViews.firstObject.active');
  }.property()
});

export default BikerApp;