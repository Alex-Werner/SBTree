async function get(identifier) {
  if (!identifier) throw new Error('Expected an objectid')

  let document = {
    _id: identifier
  };
  const res = await this.adapter.getDocument(identifier);

  return res || false;

  // for(const field in this.fieldTrees){
  //   const data = await this.fieldTrees[field].get(id);
  //   document = Object.assign(document, data);
  // }
  // await Promise.all(map(this.fieldTrees, async (fieldTree) => {
  //       const {field} = fieldTree;
  //       if (this.options.verbose) console.log(`Seeking for ${id} in ${field}`);
  //       const data = await fieldTree.get(id);
  //       document = Object.assign(document, data);
  //     }
  // ));
  // return document;
};
module.exports = get;
