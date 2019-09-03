const {map} = require('lodash')
const query = require('./query')


async function remove(_query) {
  const results = await query.call(this, _query)
  for (const result of results) {
    for (const _fieldName in result) {
      if (_fieldName !== '_id') {
        const fieldNode = this.getFieldTree(_fieldName);
        await fieldNode.remove(result._id);

        // Remove documents
        await this.getAdapter().removeDocument(result._id);
      }
    }
  }


  return [results];
};
module.exports = remove;
