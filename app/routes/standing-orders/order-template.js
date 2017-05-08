import Ember from 'ember';

const { isBlank } = Ember;

const MODEL_INCLUDES = [
	"order-template-items",
  "order-template-items.item",
  "order-template-days",
  "location",
  "location.company"
];

export default Ember.Route.extend({
  setupController(controller, model) {
    controller.set("items", this.store.peekAll("item"));

    this._super(...arguments);
  },

  model(params) {
    return this.store.findRecord("order-template", params.id, {
      include:MODEL_INCLUDES.join(",")
    });
  },

	actions: {
    createLineItem(orderTemplate, item) {
      this.store
        .createRecord('order-template-item', {orderTemplate, item})
        .save();
    },

    async onDaysChanged(orderTemplate, day, enabled) {
      const collection = await orderTemplate.get('orderTemplateDays');
      let match = collection.find(item => item.get('day') === day);

      if(isBlank(match)) {
        match = this.store.createRecord('order-template-day', {orderTemplate, day, enabled});
      }

      match.set('enabled', enabled);
      match.save();
    },

    saveModel(model) {
      model.save();
    },

    deleteLineItem(model) {
      model.destroyRecord();
    }
	}
});
