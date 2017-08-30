import Ember from 'ember';

const movies = [
  {
    id: 1,
    name: 'Power Rangers',
    year: 2015,
    synopsis: '5 teens of Angel Grove are chosen to fight against the evil Rita, using the ancient powers of the Rangers'
  },
  {
    id: 2,
    name: 'Fast and Furious 8',
    year: 2017,
    synopsis: 'This time the family is broken, the last ride of this group is full of adrenaline, cars and action'
  },
  {
    id: 3,
    name: 'La la land',
    year: 2016,
    synopsis: 'The story of how stars in Hollywood are born, in a passionate musical'
  },
  {
    id: 4,
    name: 'The theory of everything',
    year: 2015,
    synopsis: 'The gratest mind of current century created a theory that explains everything but love.'
  },
  {
    id: 5,
    name: 'Life of pi',
    year: 2014,
    synopsis: 'Pi\'s faith and rescilence are tested in a journey to survive in the ocean'
  },
]

export default Ember.Service.extend({
  store: Ember.inject.service(),
  loaded: Ember.computed(function() {
    return this.get('store').peekAll('movie').length == movies.length;
  }),
  import(){
    return new Ember.RSVP.Promise((resolve)=>{
      this.doImport();
      resolve();
    })
  },

  doImport(){
    let store = this.get('store');
    movies.forEach((seed)=>{
      if(store.peekRecord('movie', Ember.get(seed, 'id'))){
        return false;
      }

      let movie = store.createRecord('movie', {id: Ember.get(seed, 'id')});
      movie.eachAttribute((name, meta)=>{
        if(Ember.get(meta, 'isAttribute')
          && typeof Ember.get(seed, name) == Ember.get(meta, 'type')){
          movie.set(name, Ember.get(seed, name));
        }
      })
    });
  }
});
