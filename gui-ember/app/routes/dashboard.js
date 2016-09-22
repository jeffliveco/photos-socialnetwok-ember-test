import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		if (!this.get('session.isAuthenticated')) {
			this.transitionTo('index');
		}
  	},
  	model: function() {
    	return this.store.findAll('photo');
  	},
  	actions: {
    	savePhoto: function(photo){
      		console.log(photo);
    	}
  	}
});
