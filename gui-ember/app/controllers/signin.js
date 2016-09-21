import Ember from 'ember';

export default Ember.Controller.extend({

	email:'',
	password:'',

	isEmailText: Ember.computed.empty('email'),
	isPasswordText: Ember.computed.empty('password'),

	actions:{
		OnSignin() {
			let completeForm = true;

			if(this.get("isEmailText")){
				this.set('responseErrorMessage', `Validation! Field 'email' is required.`);
				completeForm = false;
			}

			if(this.get("isPasswordText")){
				this.set('responseErrorMessage', `Validation! Field 'password' is required.`);
				completeForm = false;
			}

			if(completeForm){
				this.set('responseSuccessMessage', `Transaction! Is login.`);

				this.get('session').open('firebase', {
					provider: 'password',
					email: this.get("email"),
					password: this.get("password")
				}).then(function(data) {
					this.transitionTo('index');
        			console.log(data.currentUser);
     			});
			}
		}
	}
});
