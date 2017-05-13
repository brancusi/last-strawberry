import DS from 'ember-data';
import computed from "ember-computed-decorators";

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  orderTemplate:  belongsTo('order-template'),

  day:            attr('number'),
  enabled:        attr('boolean')
});
