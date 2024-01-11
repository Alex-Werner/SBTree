// const { insertSorted } = require('../../../utils/array');

import {insertSorted} from '../../../utils/array.js';
async function addInLeaf(leafName, identifier, value) {
  if (!this.leafs[leafName]) {
    await this.createLeaf(leafName);
  }
  const { meta, data } = this.leafs[leafName];

  if (meta.identifiers.includes(identifier)) {
    // TODO : except unique:false?
    return false;
  }

  const index = insertSorted(data.keys, value);

  // if(!this.documents[identifier]){
  //   this.documents[identifier] = {_id: identifier}
  // }
  // this.documents[identifier][field] = key;
  meta.size += 1;
  meta.identifiers.splice(index, 0, identifier);
}
export default addInLeaf;
