import Ember from 'ember';
import moment from 'moment';

const today = moment().clone.bind(moment());

const schedules = [
  {
    id: 1,
    startDate: today().add(1, 'hour').toDate(),
    endDate: today().add(2.5, 'hour').toDate(),
    roomId: 1
  },
  {
    id: 2,
    startDate: today().add(3, 'hours').toDate(),
    endDate: today().add(4.5, 'hours').toDate(),
    roomId: 1
  },
  {
    id: 3,
    startDate: today().add(1, 'hours').toDate(),
    endDate: today().add(2.5, 'hour').toDate(),
    roomId: 2
  },
  {
    id: 4,
    startDate: today().add(3, 'hours').toDate(),
    endDate: today().add(4.5, 'hours').toDate(),
    roomId: 2
  },
  {
    id: 5,
    startDate: today().add(1, 'hour').toDate(),
    endDate: today().add(2.5, 'hour').toDate(),
    roomId: 3
  },
  {
    id: 6,
    startDate: today().add(3, 'hours').toDate(),
    endDate: today().add(4.5, 'hours').toDate(),
    roomId: 3
  },
  {
    id: 7,
    startDate: today().add(5, 'hours').toDate(),
    endDate: today().add(6.5, 'hours').toDate(),
    roomId: 3
  }
]

export default Ember.Service.extend({
  store: Ember.inject.service(),
  import(movieId){
    return new Ember.RSVP.Promise((resolve, reject)=>{
      this.doImport(movieId);
      resolve();
    });
  },

  doImport(movieId){
    let store = this.get('store');
    schedules.forEach((seed)=>{
      let seedId = Ember.get(seed, 'id');
      let schedule = store.peekRecord('schedule', seedId) || store.createRecord('schedule', {id: seedId})

      schedule.eachAttribute((name, meta)=>{
        if(Ember.get(meta, 'isAttribute') && (typeof Ember.get(seed, name) == Ember.get(meta, 'type') || (typeof Ember.get(seed, name) == 'object' && Ember.get(meta, 'type')) == 'date')){
          schedule.set(name, Ember.get(seed, name));
        }
      });

      schedule.eachRelationship((name, meta)=>{
        let {key, kind, type} = Ember.getProperties(meta, ['key', 'kind', 'type']);
        if(Ember.get(seed, `${type}Id`)){
          schedule.set(name, store.peekRecord(type, Ember.get(seed, `${type}Id`)));
        }
      })

      schedule.set('movie', store.peekRecord('movie', movieId));
    });
  }
});
