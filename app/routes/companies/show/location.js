import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const INCLUDES = [
  'address',
  'item-desires',
  'item-desires.item',
  'visit-days'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    this._super(controller, model);

    controller.set('items', this.store.peekAll('item'));
  },

  model(params){
    return this.store.findRecord('location', params.location_id, {
      adapterOptions: {
        query: {include:INCLUDES.join(',')}
      }
    });
  },

  actions: {
    updateItemDesires(source) {
      const location = this.modelFor('companies.show.location');
      const itemDesires = location.get('itemDesires');

      source
        .map(({id, enabled}) => {
          const itemDesirePredicate = resource => resource.get('item.id') === id;
          const itemPredicate = resource => resource.get('id') === id;
          const item = this.store.peekAll('item').find(itemPredicate);

          let match = itemDesires.find(itemDesirePredicate);

          if(!match) {
            match = this.store.createRecord('item-desire', {item, location});
          }

          match.set('enabled', enabled);
          return match;
        })
        .filter(itemDesire => itemDesire.get('hasDirtyAttributes'))
        .forEach(itemDesire => itemDesire.save());

      return this.modelFor('companies.show.location').get('itemDesires');
    },

    updateVisitDays(source) {
      const location = this.modelFor('companies.show.location');
      const visitDays = location.get('visitDays');

      source
        .map(({id, enabled}) => {
          const visitDayPredicate = resource => resource.get('day') === id;
          const day = id;

          let match = visitDays.find(visitDayPredicate);

          if(!match) {
            match = this.store.createRecord('visit-day', {location, day});
          }

          match.set('enabled', enabled);
          return match;
        })
        .filter(visitDay => visitDay.get('hasDirtyAttributes'))
        .forEach(visitDay => visitDay.save());

      return this.modelFor('companies.show.location').get('visitDays');
    }
  }
});