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

async function createLeaf(leafName){
  if(this.leafs[leafName]) {
    throw new Error(`Leaf ${leafName} already exist.`)
  }
  this.leafs[leafName] = {
    meta: new Meta(),
    data: new Data()
  };
};

module.exports = createLeaf;
