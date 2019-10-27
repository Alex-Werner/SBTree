const {cloneDeep} = require('lodash');
module.exports = async function getDocument(identifier) {
  return cloneDeep(await this.openDocument(identifier));
}
