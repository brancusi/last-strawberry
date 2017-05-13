import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/standing-orders/location', 'Integration | Component | sections/standing orders/location', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sections/standing-orders/location}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sections/standing-orders/location}}
      template block text
    {{/sections/standing-orders/location}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
