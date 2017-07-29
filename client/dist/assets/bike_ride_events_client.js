"use strict";



define('bike_ride_events_client/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Adapter = _emberData.default.JSONAPIAdapter;
	exports.default = Adapter.extend({
		namespace: 'api',
		host: 'http://localhost:3000'
	});
});
define('bike_ride_events_client/app', ['exports', 'ember', 'bike_ride_events_client/resolver', 'ember-load-initializers', 'bike_ride_events_client/config/environment'], function (exports, _ember, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var BikerApp = void 0;

  _ember.default.MODEL_FACTORY_INJECTIONS = true;

  BikerApp = _ember.default.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    LOG_TRANSITIONS: true,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(BikerApp, _environment.default.modulePrefix);

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

  BikerApp.BikersIndexRoute = _ember.default.Route.extend({

    setupController: function setupController(controller) {

      var bikers = this.get('store').find('biker'); // App.Phonebook.find();
      controller.set('content', bikers);
    },

    renderTemplate: function renderTemplate() {
      this.render('bikers.index', {
        into: 'application'
      });
    }

  });

  BikerApp.BikersEditRoute = _ember.default.Route.extend({

    setupController: function setupController(controller, model) {
      this.controllerFor('bikers.edit').setProperties({
        isNew: false,
        content: model
      });
    },

    renderTemplate: function renderTemplate() {
      this.render('bikers.edit', {
        into: 'application'
      });
    }

  });

  BikerApp.PhonebooksNewRoute = _ember.default.Route.extend({
    setupController: function setupController(controller, model) {
      var newPhonebook = this.store.createRecord('phonebook', {});
      this.controllerFor('bikers.edit').setProperties({
        isNew: true,
        content: newPhonebook
      });
    },
    renderTemplate: function renderTemplate() {
      this.render('bikers.edit', {
        into: 'application'
      });
    }

  });

  BikerApp.BikersEditController = _ember.default.ObjectController.extend({
    updateItem: function updateItem(biker) {
      biker.save();
      this.get("target").transitionTo("bikers");
    },

    isNew: function () {
      console.log("calculating isNew");
      return this.get('content').get('id');
    }.property()

  });

  BikerApp.PhonebooksIndexController = _ember.default.ArrayController.extend({

    editCounter: function () {
      return this.filterProperty('selected', true).get('length');
    }.property('@each.selected'),

    itemsSelected: function () {
      return this.get("editCounter") > 0;
    }.property('editCounter'),

    removeItem: function removeItem(phonebook) {
      phonebook.on("didDelete", this, function () {
        console.log("record deleted");
      });

      phonebook.destroyRecord();
    },

    removeSelectedPhonebooks: function removeSelectedPhonebooks() {
      arr = this.filterProperty('selected', true);
      if (arr.length == 0) {
        output = "nothing selected";
      } else {
        output = "";
        for (i = 0; i < arr.length; i++) {
          arr[i].destroyRecord();
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

  _ember.default.Handlebars.registerBoundHelper('locsPresent', function (myBinding, options) {
    console.log(myBinding);
    console.log(options);
    return true;
  });

  BikerApp.NavView = _ember.default.View.extend({
    tagName: 'li',
    classNameBindings: ['active'],

    didInsertElement: function didInsertElement() {
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

  exports.default = BikerApp;
});
define('bike_ride_events_client/components/flex-grid-item', ['exports', 'ember-flex-grid/components/flex-grid-item'], function (exports, _flexGridItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _flexGridItem.default;
});
define('bike_ride_events_client/components/flex-grid-row', ['exports', 'ember-flex-grid/components/flex-grid-row'], function (exports, _flexGridRow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _flexGridRow.default;
});
define('bike_ride_events_client/components/flex-grid', ['exports', 'ember-flex-grid/components/flex-grid'], function (exports, _flexGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _flexGrid.default;
});
define('bike_ride_events_client/controllers/biker', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Controller = _ember.default.Controller,
	    computed = _ember.default.computed;
	var alias = computed.alias;
	exports.default = Controller.extend({

		bikers: alias('model'),

		currBiker: null,

		name: '',
		email: '',

		id: '',

		cannotCreate: computed('fullname', 'email', function () {
			return !this.get('fullname') || !this.get('email');
		}),

		actions: {
			createBiker: function createBiker() {
				var _getProperties = this.getProperties('fullname', 'email'),
				    name = _getProperties.name,
				    email = _getProperties.email;

				this.store.createRecord('biker', {
					name: name,
					email: email
				}).save();
			},
			readBiker: function readBiker() {
				var _this = this;

				var id = this.get('id');
				this.store.findRecord('biker', id).then(function (biker) {
					_this.set('currBiker', biker);
				});
			},
			updateBiker: function updateBiker() {
				var _getProperties2 = this.getProperties('id', 'fullname', 'email'),
				    id = _getProperties2.id,
				    name = _getProperties2.name,
				    email = _getProperties2.email;

				this.store.findRecord('biker', id).then(function (biker) {
					biker.setProperties({
						name: name,
						email: email
					});

					biker.save(); // => PUT to '/bikers/{id}'
				});
			},
			deleteBiker: function deleteBiker() {
				var id = this.get('id');
				this.store.findRecord('biker', id).then(function (biker) {
					biker.destroyRecord(); // => DELETE to /bikers/{id}
				});
			}
		}
	});
});
define('bike_ride_events_client/controllers/user', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Controller = _ember.default.Controller,
	    computed = _ember.default.computed;
	var alias = computed.alias;
	exports.default = Controller.extend({

		users: alias('model'),

		currUser: null,

		name: '',
		email: '',

		id: '',

		cannotCreate: computed('name', 'email', function () {
			return !this.get('name') || !this.get('email');
		}),

		actions: {
			createUser: function createUser() {
				var _getProperties = this.getProperties('name', 'email'),
				    name = _getProperties.name,
				    email = _getProperties.email;

				this.store.createRecord('user', {
					name: name, email: email
				}).save();
			},
			readUser: function readUser() {
				var _this = this;

				var id = this.get('id');
				this.store.findRecord('user', id).then(function (user) {
					_this.set('currUser', user);
				});
			},
			updateUser: function updateUser() {
				var _getProperties2 = this.getProperties('id', 'name', 'email'),
				    id = _getProperties2.id,
				    name = _getProperties2.name,
				    email = _getProperties2.email;

				this.store.findRecord('user', id).then(function (user) {
					user.setProperties({
						name: name, email: email
					});

					user.save(); // => PUT to '/users/{id}'
				});
			},
			deleteUser: function deleteUser() {
				var id = this.get('id');
				this.store.findRecord('user', id).then(function (user) {
					user.destroyRecord(); // => DELETE to /users/{id}
				});
			}
		}
	});
});
define('bike_ride_events_client/helpers/app-version', ['exports', 'ember', 'bike_ride_events_client/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = _ember.default.Helper.helper(appVersion);
});
define('bike_ride_events_client/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('bike_ride_events_client/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('bike_ride_events_client/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'bike_ride_events_client/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('bike_ride_events_client/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('bike_ride_events_client/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('bike_ride_events_client/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('bike_ride_events_client/initializers/export-application-global', ['exports', 'ember', 'bike_ride_events_client/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('bike_ride_events_client/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('bike_ride_events_client/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('bike_ride_events_client/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("bike_ride_events_client/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('bike_ride_events_client/models/biker', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Model = _emberData.default.Model,
      attr = _emberData.default.attr;
  exports.default = Model.extend({
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
  }, {
    "fullname": "Erika Pinho Lemos",
    "email": "erika@gmail.com",
    "city": "Indaiatuba",
    "group_ride": 1,
    "days_week": "Sat,Sun"
  }];
});
define('bike_ride_events_client/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Model = _emberData.default.Model,
      attr = _emberData.default.attr;
  exports.default = Model.extend({
    name: attr('string'),
    email: attr('string')
  });
});
define('bike_ride_events_client/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('bike_ride_events_client/router', ['exports', 'ember', 'bike_ride_events_client/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = _ember.default.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('user');

    this.route("index", { path: "/" });
    this.route("about", { path: "/about" });

    this.resource("bikers", function () {
      console.log("Inside bikers....");
      this.route("new", { path: "/new" });
      this.route("edit", { path: "/:biker_id" });
    });
    this.route('scientists');
  });

  exports.default = Router;
});
define('bike_ride_events_client/routes/about', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({});
});
define('bike_ride_events_client/routes/biker', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Route = _ember.default.Route;
	exports.default = Route.extend({

		model: function model() {
			return this.store.findAll('biker');
		}
	});
});
define('bike_ride_events_client/routes/index', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    beforeModel: function beforeModel() {
      this.replaceWith('biker');
    }
  });
});
define('bike_ride_events_client/routes/scientists', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({});
});
define('bike_ride_events_client/routes/user', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Route = _ember.default.Route;
	exports.default = Route.extend({

		model: function model() {
			return this.store.findAll('user');
		}
	});
});
define('bike_ride_events_client/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("bike_ride_events_client/templates/about", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 6
          }
        },
        "moduleName": "bike_ride_events_client/templates/about.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "jumbo");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "right tomster");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("About Bike Ride Events");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    The Bike Ride Events APP is a delightful project created to explore Ember.\n    By building a propertyBike Ride Events, we can simultaneously imagine traveling\n    AND building Ember applications.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  }());
});
define("bike_ride_events_client/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 4
            },
            "end": {
              "line": 7,
              "column": 4
            }
          },
          "moduleName": "bike_ride_events_client/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("em");
          var el3 = dom.createTextNode("Venturus - Biker Ride Events");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    }();
    var child1 = function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 6
            },
            "end": {
              "line": 11,
              "column": 6
            }
          },
          "moduleName": "bike_ride_events_client/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        About\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    }();
    var child2 = function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 6
            },
            "end": {
              "line": 14,
              "column": 6
            }
          },
          "moduleName": "bike_ride_events_client/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        Contact\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    }();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 6
          }
        },
        "moduleName": "bike_ride_events_client/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "menu");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "links");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "body");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element1, 1, 1);
        morphs[1] = dom.createMorphAt(element2, 1, 1);
        morphs[2] = dom.createMorphAt(element2, 2, 2);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
        return morphs;
      },
      statements: [["block", "link-to", ["index"], [], 0, null, ["loc", [null, [3, 4], [7, 16]]]], ["block", "link-to", ["about"], [], 1, null, ["loc", [null, [9, 6], [11, 18]]]], ["block", "link-to", ["contact"], [], 2, null, ["loc", [null, [12, 6], [14, 18]]]], ["content", "outlet", ["loc", [null, [18, 4], [18, 14]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  }());
});
define("bike_ride_events_client/templates/bikers", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 7,
              "column": 2
            }
          },
          "moduleName": "bike_ride_events_client/templates/bikers.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(fragment, [5]), 0, 0);
          return morphs;
        },
        statements: [["content", "biker.fullname", ["loc", [null, [4, 8], [4, 26]]]], ["content", "biker.email", ["loc", [null, [5, 8], [5, 23]]]], ["content", "biker.city", ["loc", [null, [6, 8], [6, 22]]]]],
        locals: [],
        templates: []
      };
    }();
    var child1 = function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 2
            },
            "end": {
              "line": 9,
              "column": 2
            }
          },
          "moduleName": "bike_ride_events_client/templates/bikers.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("no biker found... :-(");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    }();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 5
          }
        },
        "moduleName": "bike_ride_events_client/templates/bikers.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Bikers");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1, "class", "bikers-listing");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "biker", ["loc", [null, [3, 10], [3, 15]]]]], [], 0, 1, ["loc", [null, [3, 2], [9, 11]]]]],
      locals: [],
      templates: [child0, child1]
    };
  }());
});
define("bike_ride_events_client/templates/components/flex-grid-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "bike_ride_events_client/templates/components/flex-grid-item.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  }());
});
define("bike_ride_events_client/templates/components/flex-grid-row", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "bike_ride_events_client/templates/components/flex-grid-row.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  }());
});
define("bike_ride_events_client/templates/components/flex-grid", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "bike_ride_events_client/templates/components/flex-grid.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  }());
});
define("bike_ride_events_client/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "bike_ride_events_client/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  }());
});
define("bike_ride_events_client/templates/scientists", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "bike_ride_events_client/templates/scientists.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  }());
});
define("bike_ride_events_client/templates/user", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 1
            },
            "end": {
              "line": 5,
              "column": 1
            }
          },
          "moduleName": "bike_ride_events_client/templates/user.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(", ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element0, 0, 0);
          morphs[1] = dom.createMorphAt(element0, 2, 2);
          return morphs;
        },
        statements: [["content", "u.name", ["loc", [null, [4, 6], [4, 16]]]], ["content", "u.email", ["loc", [null, [4, 18], [4, 29]]]]],
        locals: ["u"],
        templates: []
      };
    }();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 46,
            "column": 4
          }
        },
        "moduleName": "bike_ride_events_client/templates/user.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Users");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1, "id", "user-list");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "button");
        var el3 = dom.createTextNode("\n		Create user\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "button");
        var el3 = dom.createTextNode("\n		Read user\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Current user");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Name: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Email: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "button");
        var el3 = dom.createTextNode("\n		Update user\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "button");
        var el3 = dom.createTextNode("\n		Delete user\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [6]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(fragment, [10]);
        var element4 = dom.childAt(element3, [1]);
        var element5 = dom.childAt(element3, [5]);
        var element6 = dom.childAt(fragment, [14]);
        var element7 = dom.childAt(element6, [1]);
        var element8 = dom.childAt(fragment, [18]);
        var element9 = dom.childAt(element8, [1]);
        var morphs = new Array(15);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        morphs[1] = dom.createAttrMorph(element2, 'disabled');
        morphs[2] = dom.createElementMorph(element2);
        morphs[3] = dom.createMorphAt(element1, 3, 3);
        morphs[4] = dom.createMorphAt(element1, 5, 5);
        morphs[5] = dom.createElementMorph(element4);
        morphs[6] = dom.createMorphAt(element3, 3, 3);
        morphs[7] = dom.createMorphAt(dom.childAt(element5, [3]), 1, 1);
        morphs[8] = dom.createMorphAt(dom.childAt(element5, [5]), 1, 1);
        morphs[9] = dom.createElementMorph(element7);
        morphs[10] = dom.createMorphAt(element6, 3, 3);
        morphs[11] = dom.createMorphAt(element6, 5, 5);
        morphs[12] = dom.createMorphAt(element6, 7, 7);
        morphs[13] = dom.createElementMorph(element9);
        morphs[14] = dom.createMorphAt(element8, 3, 3);
        return morphs;
      },
      statements: [["block", "each", [["get", "users", ["loc", [null, [3, 9], [3, 14]]]]], [], 0, null, ["loc", [null, [3, 1], [5, 10]]]], ["attribute", "disabled", ["get", "cannotCreate", ["loc", [null, [10, 58], [10, 70]]]]], ["element", "action", ["createUser"], [], ["loc", [null, [10, 23], [10, 46]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "name", ["loc", [null, [13, 27], [13, 31]]]]], [], []], "placeholder", "name"], ["loc", [null, [13, 1], [13, 52]]]], ["inline", "input", [], ["type", "email", "value", ["subexpr", "@mut", [["get", "email", ["loc", [null, [14, 28], [14, 33]]]]], [], []], "placeholder", "email"], ["loc", [null, [14, 1], [14, 55]]]], ["element", "action", ["readUser"], [], ["loc", [null, [19, 23], [19, 44]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "id", ["loc", [null, [22, 27], [22, 29]]]]], [], []], "placeholder", "id"], ["loc", [null, [22, 1], [22, 48]]]], ["content", "currUser.name", ["loc", [null, [25, 11], [25, 28]]]], ["content", "currUser.email", ["loc", [null, [26, 12], [26, 30]]]], ["element", "action", ["updateUser"], [], ["loc", [null, [32, 23], [32, 46]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "id", ["loc", [null, [35, 27], [35, 29]]]]], [], []], "placeholder", "id"], ["loc", [null, [35, 1], [35, 48]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "name", ["loc", [null, [36, 27], [36, 31]]]]], [], []], "placeholder", "name"], ["loc", [null, [36, 1], [36, 52]]]], ["inline", "input", [], ["type", "email", "value", ["subexpr", "@mut", [["get", "email", ["loc", [null, [37, 28], [37, 33]]]]], [], []], "placeholder", "email"], ["loc", [null, [37, 1], [37, 55]]]], ["element", "action", ["deleteUser"], [], ["loc", [null, [42, 23], [42, 46]]]], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "id", ["loc", [null, [45, 27], [45, 29]]]]], [], []], "placeholder", "id"], ["loc", [null, [45, 1], [45, 48]]]]],
      locals: [],
      templates: [child0]
    };
  }());
});


define('client/config/environment', ['ember'], function(Ember) {
  var prefix = 'client';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("client/app")["default"].create({"name":"bike_ride_events_client","version":"0.1.0+88f60f03"});
}
//# sourceMappingURL=bike_ride_events_client.map
