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
  }
});
