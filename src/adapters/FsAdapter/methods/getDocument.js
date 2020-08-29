const cloneDeep = require('lodash.clonedeep');

module.exports = async function getDocument(identifier) {
  return cloneDeep(await this.openDocument(identifier));
};
