import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/order-template-editor/order-template-item-editor', 'Integration | Component | ui/order template editor/order template item editor', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui/order-template-editor/order-template-item-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui/order-template-editor/order-template-item-editor}}
      template block text
    {{/ui/order-template-editor/order-template-item-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
