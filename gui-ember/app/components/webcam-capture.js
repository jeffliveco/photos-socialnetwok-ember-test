import Ember from 'ember';

export default Ember.Component.extend({
	isRejected: false,
  	didInsertElement: function(){
    	this.video = this.$("#videoLayer");
    	this.canvas = this.$("#canvasLayer");
    	this.buttonSnap = this.$("#btnCapture");
    	this.confirmation = this.$("#btnConfirmation");
    	this.finalPhoto = this.$("#btnSelectFinalPhoto");
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

    	this.$('#addPhotoModal').on('hidden.bs.modal', function () {

    		component.canvas[0].style.display = 'none';
        	component.video[0].style.display = 'block';
        	component.confirmation[0].style.display = 'none';
        	component.buttonSnap[0].style.display = 'block';
        	component.finalPhoto[0].style.display = 'none';

        	component.$(component.images).each(function(i, item){
        		component.$(item).attr('src', 'https://dummyimage.com/160x120/000/fff');
        	});

        	component.$(component.photos).each(function(i, item){
        		component.$(item).attr('src', 'https://dummyimage.com/90/000/fff');
        	});

        	component.numPhotos = 0;
		});
  	},
  	actions: {
    	snap: function(){
      		if (this.localMediaStream) {
        		this.ctx.drawImage(this.video[0], 0, 0, 400, 300);
        		// "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
        		this.dataURL = this.canvas[0].toDataURL('image/png');

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

				this.effects[this.numPhotos] = "original";
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
        		this.effects[this.numPhotos] = this.effects[this.numPhotos];

        		this.$("#photo-" + this.numPhotos).attr("class", "photo-selected " + this.effects[this.numPhotos]);
        		this.numPhotos++;
        	} else {
        		this.numPhotos = 0;
        	}
    	},
    	onSelectPhoto:function(numItem){
    		var component = this;
    		this.numPhoto = numItem;
    		this.$(this.photos[this.numPhotos]).attr('src');
    		
    		var image = new Image();
    		image.onload = function() {
			    component.ctx.drawImage(image, 0, 0, 400, 300);
			};
			image.src = this.base64Photos[this.numPhotos];

			this.canvas[0].style.display = 'block';
        	this.video[0].style.display = 'none';
        	this.confirmation[0].style.display = 'none';
        	this.buttonSnap[0].style.display = 'none';
        	this.finalPhoto[0].style.display = 'block';
    	},
    	onConfirm:function(){
    		this.$('#addPhotoModal').modal('hide');
    		var component = this;
			this.canvas[0].toBlob(function(blob) { 
				component.sendAction('snap', blob, component.effects[component.numPhoto]);
			});
    	},
    	onCancel:function(){
    		this.canvas[0].style.display = 'none';
        	this.video[0].style.display = 'block';
        	this.confirmation[0].style.display = 'none';
        	this.buttonSnap[0].style.display = 'block';
        	this.finalPhoto[0].style.display = 'none';
    	},
    	onEffectSelected:function(effect){
    		if(effect !== 'original'){
    			this.canvas[0].className = "ig-" + effect;
    			this.effects[this.numPhotos] = "ig-" + effect;
    		} else {
    			this.canvas[0].className = "";
    			this.effects[this.numPhotos] = "original";
    		}
    	}
  	}
});
