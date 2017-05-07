import DS from 'ember-data';
const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  location:           belongsTo('location'),

  orderTemplateItems: hasMany('order-template-item'),
  orderTemplateDays:  hasMany('order-template-day'),

  startDate:          attr('date')
});
