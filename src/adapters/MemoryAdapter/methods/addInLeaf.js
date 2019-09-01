const {insertSorted} = require('../../../utils/array');

async function addInLeaf(leafName, field, identifier, key){
  if(!this.leafs[leafName]){
    await this.createLeaf(leafName);
  }

  const index = insertSorted(this.leafs[leafName].data.keys, key);

  if(!this.documents[identifier]){
    this.documents[identifier] = {_id: identifier}
  }
  this.documents[identifier][field] = key;

  this.leafs[leafName].meta.size +=1;
  this.leafs[leafName].meta.identifiers.splice(index, 0, identifier);
}
module.exports = addInLeaf;
