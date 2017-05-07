import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/standing-orders', 'Integration | Component | sections/standing orders', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sections/standing-orders}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sections/standing-orders}}
      template block text
    {{/sections/standing-orders}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
