import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:sales-orders/show', 'Unit | Controller | sales orders/show', {
  // Specify the other units that are required for this test.
  needs: ['service:firebaseMgr']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
