import Ember from 'ember';

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    creditCard: '44441111111321'
  },
  {
    id: 2,
    name: 'Karina May',
    email: 'kmay@email.com',
    creditCard: '55551111111132'
  },
  {
    id: 3,
    name: 'Richard Johnson',
    email: 'mrfantastic@email.com',
    creditCard: '66661111111213'
  }
]

export default Ember.Service.extend({
  store: Ember.inject.service(),
  loaded: Ember.computed(function() {
    return this.get('store').peekAll('user').length == users.length;
  }),
  import(){
    return new Ember.RSVP.Promise((resolve)=>{
      this.doImport();
      resolve();
    })
  },

  doImport(){
    let store = this.get('store');
    users.forEach((seed)=>{
      if(store.peekRecord('user', Ember.get(seed, 'id'))){
        return false;
      }

      let user = store.createRecord('user', {id: Ember.get(seed, 'id')});
      user.eachAttribute((name, meta)=>{
        if(Ember.get(meta, 'isAttribute')
          && typeof Ember.get(seed, name) == Ember.get(meta, 'type')){
          user.set(name, Ember.get(seed, name));
        }
      })
    });
  }
});
