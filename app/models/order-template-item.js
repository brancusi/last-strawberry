import DS from 'ember-data';
const { attr, belongsTo } = DS;

export default DS.Model.extend({

  orderTemplate:  belongsTo('order-template'),
  item:           belongsTo('item'),

  quantity:       attr('number', {defaultValue: 0})
});
