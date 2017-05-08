import Ember from 'ember';
import activeState from "last-strawberry/constants/active-states";

const MODEL_INCLUDES = [
	"company",
  "order-templates",
  "order-templates.order-template-items",
  "order-templates.order-template-days"
];

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord("location", params.id, {
      include:MODEL_INCLUDES.join(",")
    });
  },

	actions: {
		async createOrderTemplate() {
			const location = this.modelFor("standing-orders.location");
			const orderTemplate = this.store.createRecord('order-template', {location, startDate:moment().toDate()});
			await orderTemplate.save();

			this.transitionTo('standing-orders.order-template', orderTemplate.get('id'));
		}
	}
});
