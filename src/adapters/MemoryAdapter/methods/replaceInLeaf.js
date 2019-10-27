async function replaceInLeaf(leafId, identifier, value){
  if(!this.leafs[leafId]){
    throw new Error(`Unexistant leaf id ${leafId}`)
  }
  const {meta, data} = this.leafs[leafId];

  if(!meta.identifiers.includes(identifier)){
    //TODO : except unique:false?
    throw new Error(`Identifier ${identifier} do not exist`);
  }

  const index = meta.identifiers.indexOf(identifier);
  data.keys[index] = value;
}
module.exports = replaceInLeaf;
