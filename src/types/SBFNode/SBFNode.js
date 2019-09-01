const {insertSorted} = require('../../utils/array');

/**
 * SBFTree
 *
 */
class SBFNode {
  #parent
  constructor(props){
    if(!props.parent){
      throw new Error(`SBFNode initialized without parent reference`)
    }
    this.#parent = props.parent;
    this.keys = (props.keys) ? props.keys : [];
    this.childrens = (props.childrens) ? props.childrens : [];
  }
  getParent(){
    return this.#parent;
  }
  setParent(parent){
    this.#parent = parent
  }
  getTree(){
    return (this.#parent.getTree());
  }
  getAdapter(){
    return this.getTree().adapter;
  }
  getTreeOptions(){
    return this.getTree().options;
  }
  async insertReferenceKey(key){
    if(this.isFull()){
      this.split();
      throw new Error('Root is full');
    }
    const index = insertSorted(this.keys, key);
    return index;
  }
  async insert(key, identifier){
    if(!this.childrens.length){
      throw new Error(`SBFNode cannot insert with no childrens`);
    }
    let leafIndex = 0;
    this.keys.forEach((_key)=>{
      if(key<=_key) return;
      leafIndex++;
    });
    const leaf = this.childrens[leafIndex];
    await leaf.insert(key, identifier);

    if(this.isFull()){
      await this.split();
    }
  }
  getTree(){
    return this.#parent.getTree() || this.#parent.getParent().getTree();
  }
  isFull(){
    const tree = this.getTree();
    const order = tree.options.order;
    return this.keys.length>=order;
  }
  async attachLeaf(index, leaf){
    this.childrens.splice(index,0,leaf);
    leaf.setParent(this);
  }
  async split(){
    const midIndex = ~~(this.keys.length/2);
    const rightKeys = this.keys.splice(midIndex);
    const leftKeys = this.keys.splice(0);

    const midKey = rightKeys.splice(0,1)[0];

    const rightChildrens = this.childrens.splice(midIndex+1);
    const leftChildrens = this.childrens.splice(0);

    const right = new SBFNode({parent:this.#parent});
    right.keys = rightKeys;
    right.childrens = rightChildrens;
    rightChildrens.forEach((child)=>{
      child.setParent(right);
    })

    const left = new SBFNode({parent:this.#parent});
    left.keys = leftKeys;
    left.childrens = leftChildrens;
    leftChildrens.forEach((child)=>{
      child.setParent(left);
    })

    const currentChildIndex = this.#parent.childrens.indexOf(this);
    // Remove current referent
    this.#parent.childrens.splice(currentChildIndex,1);
    this.#parent.attachLeaf(currentChildIndex,left);
    this.#parent.attachLeaf(currentChildIndex+1,right);
    this.#parent.insertReferenceKey(midKey);
  }
};
module.exports = SBFNode;
