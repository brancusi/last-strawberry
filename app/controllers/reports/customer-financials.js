import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Controller.extend({
  startDate: "2016-12-01",
  endDate:"2016-12-31",

  @computed('model.report_data.@each.{total_sales_revenue}')
  filteredCompaniesFinancials(data) {
    return data
      .filter(c => Number(c.total_sales_revenue) > 0);
  },

  @computed('filteredCompaniesFinancials.@each.{total_sales_revenue}')
  sortedFilteredCompaniesFinancials(data) {
    return data
      .sort((a, b) => Number(b.total_sales_revenue) - Number(a.total_sales_revenue));
  }
});
