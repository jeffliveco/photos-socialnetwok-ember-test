import Ember from 'ember';

export default Ember.Route.extend({
    actions:{
        OnSignin:function(){
            let emailInputValue = this.get('email');
            let passwordInputValue = this.get('password');
            console.log("Signin action");
        }
    }
});
