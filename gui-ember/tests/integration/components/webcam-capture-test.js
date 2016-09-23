import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('webcam-capture', 'Integration | Component | webcam capture', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{webcam-capture}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#webcam-capture}}
      template block text
    {{/webcam-capture}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
