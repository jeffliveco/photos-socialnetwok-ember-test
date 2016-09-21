import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
    	const session = this.get('session').fetch().catch(function() {}); 
		//console.log(session.get("currentUser"));
		//this.store.findRecord('account', session.);
    	return session;
  	}
});
