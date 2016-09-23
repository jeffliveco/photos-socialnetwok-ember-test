import Ember from 'ember';

export default Ember.Controller.extend({

	firebaseApp: Ember.inject.service(),

  	actions: {
    	savePhoto: function(photo, effect){
    		console.log(photo);

    		const storageRef = this.get('firebaseApp').storage().ref();

      		let userUID = this.get('session.currentUser.uid');
      		let timestamp = moment().format();
      		//photo.substring(24, photo.length)
      		let uploadTask = storageRef.child('images/'+userUID+"-"+timestamp).put(photo);

      		let controller = this;

      		uploadTask.on('state_changed',
		        (snapshot) => {
		        	var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		          	console.log('Upload is ' + progress + '% done');
		          	switch (snapshot.state) {
		            	case 'paused':
		            		console.log("Upload is paused");
		              	break;
		            	case 'running':
		            		console.log("Upload is running");
		              	break;
		          	}
		        }, (error) => {
		        	switch (error.code) {
		          	case 'storage/unauthorized':
		            break;
		          	case 'storage/canceled':
		            break;
		          	case 'storage/unknown':
		            break;
		        }
		      }, () => {
		    	let photo = controller.store.createRecord('photo', {
		        	uid: moment().format(),
		        	path: uploadTask.snapshot.downloadURL,
		        	style: effect,
		        	account: userUID
		      	});

		      	photo.save();
		    });
    	}
  	}
});
