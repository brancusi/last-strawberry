import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";
import ItemTypes from "last-strawberry/constants/item-types";

import {
	PENDING_UPDATED_NOTIFICATION,
	AWAITING_NOTIFICATION,
	NOTIFIED
} from "last-strawberry/models/order";

import NotificationRenderer from "last-strawberry/constants/notification-renderers";
import OrderState from "last-strawberry/constants/order-states";

const ORDER_INCLUDES = [
	"order-items",
	"order-items.item",
	"location",
	"location.company",
	"location.notification-rules",
	"notifications"
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	setupController(controller, model) {
    this._super(controller, model);

		const purchaseOrderController = this.controllerFor("purchase-orders");
		purchaseOrderController.set("currentSelectedOrder", model);

		controller.set("items", this.store.peekAll("item"));
	},

	model(params){
    return this.store.findRecord("order", params.id, { reload:true, include:ORDER_INCLUDES.join(",")});
	},

	clearPurchaseOrderController: function(){
		const purchaseOrderController = this.controllerFor("purchase-orders");
    purchaseOrderController.set("currentSelectedOrder", undefined);
  }.on("deactivate"),

	markOrderTouched() {
		const order = this.modelFor("purchase-orders.show");

		switch (order.get("notificationState")) {
			case AWAITING_NOTIFICATION:
				order.set("notificationState", PENDING_UPDATED_NOTIFICATION);
				break;
			case NOTIFIED:
				order.set("notificationState", PENDING_UPDATED_NOTIFICATION);
				break;
		}

		if(order.get("hasDirtyAttributes")) {
			return order.save();
		} else {
			return true;
		}
	},

	actions: {
		updateShipping({target: { value }}) {
			const cleaned = parseFloat(value) || 0;
			const order = this.modelFor("purchase-orders.show");
			order.set("shipping", cleaned);
		},

		saveOrder() {
			const order = this.modelFor("purchase-orders.show");
			order.save();
		},

		emailOrder(model) {
			const notificationRules = model.get("location.notificationRules");
			const notifications = model.get('notifications');
			const renderer = Ember.isEmpty(notifications) ? NotificationRenderer.PURCHASE_ORDER : NotificationRenderer.UPDATED_PURCHASE_ORDER

			notificationRules.forEach(nr => {
				const notification = this.store.createRecord("notification", {
					renderer,
					order: model,
					notificationRule: nr
				});

				notification.save();
			});
		},

		async createNewItem(changeset) {
			const record = await this.store
				.createRecord("item", {
					company: changeset.get("company"),
					name: changeset.get("name"),
					code: changeset.get("code"),
					description: changeset.get("description"),
					unitOfMeasure: changeset.get("unitOfMeasure"),
					defaultPrice: changeset.get("defaultPrice"),
					tag: ItemTypes.INGREDIENT })
				.save();

				return record;
		},

		async createOrderItem(item) {
			const order = this.modelFor("purchase-orders.show");
			const unitPrice = item.get("defaultPrice");
			this.store
				.createRecord("order-item", {item, order, unitPrice})
				.save();
		},

		updateOrderItem(model, key, val) {
			model.set(key, val);
		},

		async saveOrderItem(orderItem) {
			if(orderItem.get("hasDirtyAttributes")) {
				await this.markOrderTouched();

				return orderItem
					.save()
					.catch(() => orderItem.rollbackAttributes());
			}
		},

		async deleteOrderItem(model) {
			await this.markOrderTouched();

			model.destroyRecord();
		},

		async deleteOrder(model) {
			await model.destroyRecord();

			this.transitionTo("purchase-orders");
		},

		toggleOrderState(model) {
			const updatedState = model.get("isDraft")? OrderState.APPROVED: OrderState.DRAFT;
			model.set("orderState", updatedState);

			model.save()
		}
	}
});
