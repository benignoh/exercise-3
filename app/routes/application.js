import Ember from 'ember';

export default Ember.Route.extend({
  moviesSeed: Ember.inject.service(),
  roomsSeed: Ember.inject.service(),
  usersSeed: Ember.inject.service(),
  beforeModel(){
    return Ember.RSVP.all([
      this.get('moviesSeed').import(),
      this.get('roomsSeed').import(),
      this.get('usersSeed').import()
    ])
  },
});
