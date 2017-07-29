import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('user');

  this.route("index", { path: "/" });
  this.route("about", { path: "/about" });

  this.resource("bikers", function(){
      console.log("Inside bikers....");
      this.route("new", {path:"/new"});
      this.route("edit", {path: "/:biker_id" });
  });
});

export default Router;
