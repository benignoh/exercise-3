import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  ticketsAmoun: 1,

  actions:{
    buy(amount){
      let schedule = this.get('model'), error = false;
      for(let i = 0; i < amount; i++){
        if(schedule.get('tickets')){
          schedule.get('tickets').createRecord({
            user: this.get('applicationController.currentUser')
          }).save();
        } else {
          error = true;
        }
      }
      if(error)
        alert('Ticket and Schedule relation is not properly declared');
      else
        return this.transitionToRoute('index');
    }
  }
});
