const {clone} = require('lodash');
module.exports = async function getDocument(identifier) {
  return clone(await this.openDocument(identifier));
}
