import Ember from 'ember';
import computed from "ember-computed-decorators";

export default Ember.Controller.extend({
  @computed("locations")
  groupedLocations(locations) {
    return  _
      .chain(locations.toArray())
      .sortBy(location => location.get("company.name"))
      .groupBy(location => location.get("company.name"))
      .value();
  }
});
