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
module.exports = async function createLeaf(leafName){
  this.leafs[leafName] = {
    meta: new Meta(),
    data: new Data()
  };
}
