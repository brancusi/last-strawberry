import Ember from 'ember';
import style from 'last-strawberry/utils/styles';

const DDCardAddressComponent = Ember.Component.extend({
  classNames: ['col'],
  attributeBindings:['componentStyles:style'],

  @style('colorScheme.color')
  componentStyles(color = colors.DARK_GREY) {
    return {
      'color': color
    };
  }

});

DDCardAddressComponent.reopenClass({
  positionalParams: ['address'],
});

export default DDCardAddressComponent;