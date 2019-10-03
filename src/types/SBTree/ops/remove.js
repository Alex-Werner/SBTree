const {map} = require('lodash')
const query = require('./query')
const ascii = require('../../../utils/ascii');


async function remove(_query) {
  const results = await query.call(this, _query)
  for (const result of results) {
    for (const _fieldName in result) {
      if (_fieldName !== '_id') {
        const fieldNode = this.getFieldTree(_fieldName);
        await fieldNode.remove(result._id);

        console.log('REMOVE')
        // Remove documents
        await (this.getAdapter()).removeDocument(result._id);
        console.log('REMOVED')

      }
    }
  }


  return [results];
};
module.exports = remove;
