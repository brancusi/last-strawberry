import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';
import config from 'last-strawberry/config/environment';

const BEFORE_MODEL_INCLUDES = [
  'locations'
];

const MODEL_INCLUDES = [
	'order-items',
	'order-items.item',
  'location',
  'location.company'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
	queryParams: {
    deliveryDate: {
      refreshModel: true
    }
  },

	setupController(controller, model) {
    this._super(controller, model);

		controller.set('orders', this.store.peekAll('order'));
		controller.set('companies', this.store.peekAll('company'));
    controller.set('locations', this.store.peekAll('location'));
	},

	model(params){
    this.params = params;

    return Ember.RSVP.all([
      this.store.query('item', {'filter[is_purchased]':true}),
      this.store.query('company', {include:BEFORE_MODEL_INCLUDES.join(',')}),
      this.store.query('order', {
        'filter[order_type]':'purchase-order',
        'filter[delivery_date]':params.deliveryDate,
        include:MODEL_INCLUDES.join(',')
      })
    ]);
	},

  showOrder(order) {
    this.transitionTo('purchase-orders.show', order.get('id'));
  },

  actions: {
    onOrderSelected(order) {
      this.showOrder(order);
    },

    async createOrder(location) {
      const deliveryDate = this.paramsFor('purchase-orders').deliveryDate;
      const order = await this.store
        .createRecord('order', {location, deliveryDate, orderType:'purchase-order'})
        .save();

      this.showOrder(order);
    },

    onDateSelected(date) {
      const deliveryDate = this.paramsFor('purchase-orders').deliveryDate;

      if(deliveryDate !== moment(date).format('YYYY-MM-DD')) {
        this.controllerFor('purchase-orders').set('deliveryDate', moment(date).format('YYYY-MM-DD'));
        this.transitionTo('purchase-orders');
      }
    }
  }
});