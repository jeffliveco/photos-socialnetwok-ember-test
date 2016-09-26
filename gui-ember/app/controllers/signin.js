import Ember from 'ember';

export default Ember.Controller.extend({

	email:'',
	password:'',

	isEmailText: Ember.computed.empty('email'),
	isPasswordText: Ember.computed.empty('password'),

	showErrorMessage: Ember.computed.notEmpty('responseErrorMessage'),
    showSuccessMessage: Ember.computed.notEmpty('responseSuccessMessage'),

	actions:{
		OnCloseMessage(){
			this.set('responseErrorMessage', '');
			this.set('responseSuccessMessage', '');
		},
		OnSignin() {
			let controller = this;

			if(this.get("isEmailText")){
				this.set('responseErrorMessage', `Validation! Field 'email' is required.`);
				return;
			}

			if(this.get("isPasswordText")){
				this.set('responseErrorMessage', `Validation! Field 'password' is required.`);
				return;
			}
			
			this.set('responseSuccessMessage', `Transaction! Is login.`);

			this.get('session').open('firebase', {
				provider: 'password',
				email: this.get("email"),
				password: this.get("password")
			}).then(() => {
		        controller.transitionToRoute('dashboard');
		    }, (error) => {
		    	this.set('responseErrorMessage', error.message);
		    });
		},
		OnSigninSocial(provider){
			let controller = this;
			this.get('session').open('firebase', {
				provider: provider
			}).then((result) => {
				controller.transitionToRoute('dashboard');
		    }, (error) => {
		    	this.set('responseErrorMessage', error.message);
		    });
		}
	}
});
