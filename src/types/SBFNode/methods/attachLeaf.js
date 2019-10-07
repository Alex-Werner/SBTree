module.exports = async function attachLeaf(index, leaf){
  console.log(this.getParent())
  this.childrens.splice(index,0,leaf);
  console.log(this)

}
