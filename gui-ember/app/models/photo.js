import DS from 'ember-data';

export default DS.Model.extend({
	uid: DS.attr('string'),
  	path: DS.attr('string'),
  	style: DS.attr('string'),
  	created: DS.attr('date', {
    	defaultValue() { return new Date(); }
  	}),
  	account: DS.attr('string')
});
