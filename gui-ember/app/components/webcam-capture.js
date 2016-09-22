import Ember from 'ember';

export default Ember.Component.extend({
	isRejected: false,
  	didInsertElement: function(){
    	this.video = this.$("#videoLayer");
    	this.canvas = this.$("#canvasLayer");
    	this.buttonSnap = this.$("#btnCapture");
    	this.confirmation = this.$("#btnConfirmation");
    	this.images = this.$(".effect-photo");
    	this.photos = this.$(".selected-photo");
    	this.ctx = this.canvas[0].getContext('2d');
    	this.localMediaStream = null;
    	this.numPhotos = 0;
    	this.numPhoto = 0;
    	this.base64Photos = [];
    	this.effects = [];

    	var component = this;
    	navigator.webkitGetUserMedia({video: true}, function(stream) {
      		component.video.attr('src', window.URL.createObjectURL(stream));
      		component.localMediaStream = stream;
    	}, function(){
      		Ember.run(function(){
        		component.set('isRejected', true);
      		});
    	});
  	},
  	actions: {
    	snap: function(){
      		if (this.localMediaStream) {
        		this.ctx.drawImage(this.video[0], 0, 0, 400, 300);
        		// "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
        		this.dataURL = this.canvas[0].toDataURL('image/webp');
        		this.canvas[0].style.display = 'block';
        		this.video[0].style.display = 'none';
        		this.confirmation[0].style.display = 'block';
        		this.buttonSnap[0].style.display = 'none';

        		//console.log(this.images);
        		var component = this;
        		this.images.each(function(i, item) {
        			//console.log();
					component.$(item).attr('src', component.dataURL);
				});
      		}
    	},
    	onSelect: function(){
    		this.canvas[0].style.display = 'none';
        	this.video[0].style.display = 'block';
        	this.confirmation[0].style.display = 'none';
        	this.buttonSnap[0].style.display = 'block';

        	if(this.numPhotos < 4){
        		this.$(this.photos[this.numPhotos]).attr('src', this.dataURL);
        		this.base64Photos[this.numPhotos] = this.dataURL;
        		this.effects[this.numPhotos] = this.effect;
        		this.numPhotos++;
        	} else {
        		this.numPhotos = 0;
        	}

    		//this.sendAction('snap', this.dataURL);
    	},
    	onSelectPhoto:function(numItem){
    		this.numPhoto = numItem;
    		
    	},
    	onCancel:function(){
    		this.canvas[0].style.display = 'none';
        	this.video[0].style.display = 'block';
        	this.confirmation[0].style.display = 'none';
        	this.buttonSnap[0].style.display = 'block';
    	},
    	onEffectSelected:function(effect){
    		this.effects[this.numPhotos] = effect;

    		if(effect != 'original'){
    			this.canvas[0].className = "ig-" + effect;
    			this.$(this.photos[this.numPhotos]).className = "ig-" + effect;
    		} else {
    			this.canvas[0].className = "";
    			this.$(this.photos[this.numPhotos]).className = "";
    		}
    	}
  	}
});
