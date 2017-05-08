import Ember from 'ember';
const { filterBy } = Ember.computed;

export default Ember.Component.extend({
  validLineItems: filterBy('model.orderTemplateItems', 'isDeleted', false),

  products: filterBy('items', 'isSold', true),
  activeProducts: filterBy('products', 'active', true),

  actions: {

  }
});
