const {insertSorted} = require('../utils/array');
class Meta {
  constructor(props = {}) {
    this.size = (props.size) ? props.size : 0;
    this.identifiers = [];
  }
}
class Data {
  constructor(props){
    this.keys=[]
  }
}
function getAllIndexes(arr, val) {
  let indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1){
    indexes.push(i);
  }
  return indexes;
}
class MemoryAdapter {
  constructor(){
    this.leafs = {};
    this.documents = {}
  }
  async addInLeaf(leafName, field, identifier, key){
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
  async openLeaf(leafName){
    if(!this.leafs[leafName]){
      throw new Error(`Leaf do not exist`);
    }
    return this.leafs[leafName];
  }
  async getDocument(identifier){
    return this.documents[identifier];
  }
  async findInLeaf(leafName, key){
    const indexes = getAllIndexes(this.leafs[leafName].data.keys, key);
    if(!indexes.length){
      return [];
    }
    const start = indexes[0];
    const end = indexes[0]+indexes.length;
    return this.leafs[leafName].meta.identifiers.slice(start, end);
  }
  async splitLeaf(sourceLeaf, siblingLeaf){
    if(!this.leafs[sourceLeaf.name]){
      throw new Error(`Source leaf do not exist`)
    }
    const source = this.leafs[sourceLeaf.name];
    if(!this.leafs[siblingLeaf.name]){
      throw new Error(`Sibbling leaf do not exist`);
    }
    const sibling = this.leafs[siblingLeaf.name];
    const midIndex = ~~(source.data.keys.length/2);
    const rightKeys = source.data.keys.splice(midIndex);
    const rightIdentifiers = source.meta.identifiers.splice(midIndex);
    const midKey = rightKeys.slice(0,1)[0];

    sibling.data.keys = rightKeys;
    sibling.meta.size = rightIdentifiers.length;
    sibling.meta.identifiers = rightIdentifiers;

    source.meta.size = source.meta.identifiers.length

    return midKey;
  }
  async createLeaf(leafName){
    this.leafs[leafName] = {
      meta: new Meta(),
      data: new Data()
    };
  }
};
module.exports = MemoryAdapter;
