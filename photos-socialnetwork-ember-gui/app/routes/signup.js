import Ember from 'ember';

export default Ember.Route.extend({
    willRender() {
        this.set('message',{
                'type':'success',
                'title':'Transaction',
                'content':'Information is save correctly.'
            });
    },
    actions:{
        OnSignup:function(){
            this.set('message',{
                'type':'success',
                'title':'Transaction',
                'content':'Information is save correctly.'
            });
            
            console.log("Signup action");
        }
    }
});
