import Ember from 'ember';

export default Ember.Route.extend({
  model(){

  },
  afterModel(model){
    if(!model){
      return this.transitionTo('index');
    }
  }
});
