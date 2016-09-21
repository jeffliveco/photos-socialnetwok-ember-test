import Ember from 'ember';

export default Ember.Controller.extend({

	firebaseApp: Ember.inject.service(),

	name:'',
	lastname:'',
	birthday:'',
	gender:'',
	email:'',
	password:'',
	confirmPassword:'',

	isNameText: Ember.computed.empty('name'),
	isLastNameText: Ember.computed.empty('lastname'),
	isBirthdayText: Ember.computed.empty('birthday'),
	isGenderText: Ember.computed.empty('gender'),
	isGenderCero: Ember.computed.equal('gender', '0'),
	isEmailText: Ember.computed.empty('email'),
	hasValidEmail: Ember.computed.match('email', /^.+@.+\..+$/),
	isValidEmail: Ember.computed.not('hasValidEmail'),
	isPasswordText: Ember.computed.empty('password'),
	isConfirmPasswordText: Ember.computed.empty('confirmPassword'),
	comparePassword: function() {
  		return this.get('password') !== this.get('confirmPassword');
	}.property('comparePassword'),

    showErrorMessage: Ember.computed.notEmpty('responseErrorMessage'),
    showSuccessMessage: Ember.computed.notEmpty('responseSuccessMessage'),

	actions:{
		OnCloseMessage(){
			this.set('responseErrorMessage', '');
			this.set('responseSuccessMessage', '');
		},
		OnSelectedGender(value, api){
			this.set('gender', value);
		},
		OnSignup() {
			if(this.get("isNameText")){
				this.set('responseErrorMessage', `Validation! Field 'name' is required.`);
				return;
			}

			if(this.get("isLastNameText")){
				this.set('responseErrorMessage', `Validation! Field 'lastname' is required.`);
				return;
			}

			if(this.get("isBirthdayText")){
				this.set('responseErrorMessage', `Validation! Field 'birthday' is required.`);
				return;
			}

			if(this.get("isGenderText")){
				this.set('responseErrorMessage', `Validation! Field 'gender' is required.`);
				return;
			}

			if(this.get("isGenderCero")){
				this.set('responseErrorMessage', `Validation! Field 'gender' is required.`);
				return;
			}

			if(this.get("isEmailText")){
				this.set('responseErrorMessage', `Validation! Field 'email' is required.`);
				return;
			}

			if(this.get("isValidEmail")){
				this.set('responseErrorMessage', `Validation! Field 'email' is not valid email.`);
				return;
			}

			if(this.get("isPasswordText")){
				this.set('responseErrorMessage', `Vali,dation! Field 'password' is required.`);
				return;
			}

			if(this.get("isConfirmPasswordText")){
				this.set('responseErrorMessage', `Validation! Field 'confirmPassword' is required.`);
				return;
			}

			if(this.get("comparePassword")){
				this.set('responseErrorMessage', `Validation! Passwords is not same.`);
				return;
			}

			const auth = this.get('firebaseApp').auth();
			auth.createUserWithEmailAndPassword(this.get('email'), this.get('password')).then((userResponse) => {
		    	const user = this.store.createRecord('account', {
		        	uid: userResponse.uid,
		        	name: this.get('name'),
		        	lastname: this.get('lastname'),
		        	email: userResponse.email,
		        	birthday: this.get('birthday'),
		        	gender: this.get('gender')
		      	});

		      	user.save().then((response) => {
		      		this.set('responseSuccessMessage', `Thank you! We saved your account.`);
			        this.transitionTo('signin');
			    });
		    });

			
		}
	}
});
