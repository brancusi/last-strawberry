import Ember from 'ember';

export default function decorateComponentClass() {
  Ember.Component.reopen({
    init() {
      this._super(arguments);

      const debugName = this.toString().split(':')[1]
      const cssName = debugName.split('/').join('_');
      const newName = `debug_${cssName}`;
      if(!this.classNames.includes(newName)) {
        this.classNames = this.classNames.concat(newName);
      }
    }
  });
}
