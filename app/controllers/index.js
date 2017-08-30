import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  availableUser: Ember.computed(function(){
    return this.store.peekAll('user');
  }),

  validUser(user){
    return Ember.isPresent(user.get('creditCard')) &&
      Ember.isPresent(user.get('name')) &&
      Ember.isPresent(user.get('email'))
  },

  actions: {
    enter(user){
      if(this.validUser(user)){
        this.set('applicationController.currentUser', user);
        this.transitionToRoute('movies');
      } else {
        alert('Invalid user definition');
      }
    }
  }
});
