import Ember from 'ember';

export default Ember.Route.extend({
  schedulesSeed: Ember.inject.service(),
  beforeModel(transition){
    return this.get('schedulesSeed').import(Ember.get(transition, 'params.movie.id'));
  },
  model(params){
    return this.store.peekRecord('movie', params.id);
  }
});
