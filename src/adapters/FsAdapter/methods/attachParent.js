const autosave = require('./ops/autosave')
async function attachParent(parent) {
  this.parent = parent;

  if (this.options.autoLoad) {
    try{
      await this.loadDatabase()
      if (this.autoLoadCallback && typeof this.autoLoadCallback === 'function') {
        await this.autoLoadCallback();
      }
    }catch(e){
      console.error(e);
      process.exit(1);
    }
  };
  if (this.options.autoSave === true) {
    autosave(this);
  }
  this.emit('ready');
}

module.exports = attachParent;
