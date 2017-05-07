import Ember from 'ember';
import activeState from "last-strawberry/constants/active-states";

const MODEL_INCLUDES = [
	"locations",
  "locations.company"
];

export default Ember.Route.extend({
  setupController(controller, model) {
    controller.set("locations", this.store.peekAll("location"));

    this._super(controller, model);
	},

  model() {
    return this.store.query("company", {
      "filter[active_state]":activeState.ACTIVE,
      include:MODEL_INCLUDES.join(",")
    });
  },

	actions: {
		locationSelected(id) {
			this.transitionTo('standing-orders.location', id);
		}
	}
});
