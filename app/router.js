import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('movies');
  this.route('movie', {path: '/movies/:id'});
  this.route('reservation', {path: '/reservation/:schedule_id'});
});

export default Router;
