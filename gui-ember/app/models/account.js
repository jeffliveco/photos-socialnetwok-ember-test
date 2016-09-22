import DS from 'ember-data';

export default DS.Model.extend({
  uid: DS.attr('string'),
  name: DS.attr('string'),
  lastname: DS.attr('string'),
  email: DS.attr('string'),
  birthday: DS.attr('date'),
  gender: DS.attr('string'),
  photos: DS.hasMany('photo')
});
