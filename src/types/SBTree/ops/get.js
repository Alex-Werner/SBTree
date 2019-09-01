const {map} = require('lodash');

async function get(id) {
  if (!id) throw new Error('Expected an objectid')

  let document = {
    _id: id
  };
  await Promise.all(map(this.fieldTrees, async (fieldTree) => {
        const {field} = fieldTree;
        if (this.options.verbose) console.log(`Seeking for ${id} in ${field}`);
        const data = await fieldTree.get(id);
        document = Object.assign(document, data);
      }
  ));
  return document;
};
module.exports = get;
