import Ember from 'ember';

const rooms = [
  {
    id: 1,
    name: 'Sala 5'
  },
  {
    id: 2,
    name: 'Sala XE'
  },
  {
    id: 3,
    name: 'Sala VIP'
  }
]

export default Ember.Service.extend({
  store: Ember.inject.service(),
  loaded: Ember.computed(function() {
    return this.get('store').peekAll('room').length == rooms.length;
  }),
  import(){
    return new Ember.RSVP.Promise((resolve)=>{
      this.doImport();
      resolve();
    });
  },

  doImport(){
    let store = this.get('store');
    rooms.forEach((seed)=>{
      if(store.peekRecord('room', Ember.get(seed, 'id'))){
        return false;
      }

      let room = store.createRecord('room', {id: Ember.get(seed, 'id')});
      room.eachAttribute((name, meta)=>{
        if(Ember.get(meta, 'isAttribute')
          && typeof Ember.get(seed, name) == Ember.get(meta, 'type')){
          room.set(name, Ember.get(seed, name));
        }
      })
    });
  }
});
