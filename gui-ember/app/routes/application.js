import Ember from 'ember';

export default Ember.Route.extend({  
	beforeModel() {
    	return this.get('session').fetch().catch(function(){});
  	},
  	actions:{
  		onSignOut(){
  			this.get('session').close();
  			this.transitionTo('index');
  		}
  	}
});