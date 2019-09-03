module.exports = async function splitLeaf(sourceLeaf, siblingLeaf){
  if(!this.leafs[sourceLeaf.name]){
    throw new Error(`Source leaf do not exist`)
  }
  const source = this.leafs[sourceLeaf.name];
  if(!this.leafs[siblingLeaf.name]){
    throw new Error(`Sibbling leaf do not exist`);
  }
  const sibling = this.leafs[siblingLeaf.name];
  const midIndex = ~~(source.data.keys.length/2);

  // console.log(this.leafs,sourceLeaf.name,{source:source.data.keys})
  // console.dir(this, {depth:null});

  const rightKeys = source.data.keys.splice(midIndex);
  const rightIdentifiers = source.meta.identifiers.splice(midIndex);
  const midKey = rightKeys.slice(0,1)[0];

  sibling.data.keys = rightKeys;
  sibling.meta.size = rightIdentifiers.length;
  sibling.meta.identifiers = rightIdentifiers;

  source.meta.size = source.meta.identifiers.length

  return midKey;
}
