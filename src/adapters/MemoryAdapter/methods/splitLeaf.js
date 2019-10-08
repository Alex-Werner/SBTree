module.exports = async function splitLeaf(sourceLeaf, siblingLeaf){
  if(!this.leafs[sourceLeaf.id]){
    throw new Error(`Source leaf do not exist`)
  }
  const source = this.leafs[sourceLeaf.id];
  if(!this.leafs[siblingLeaf.id]){
    throw new Error(`Sibbling leaf do not exist`);
  }
  const sibling = this.leafs[siblingLeaf.id];
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
