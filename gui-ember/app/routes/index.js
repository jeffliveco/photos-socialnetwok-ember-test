import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		const session = this.get('session').fetch().catch(function() {}); 
		console.log(session);
		//this.store.findRecord('account', session.);
    	return this.get('session').fetch().catch(function() {});
  	}
});
