const {insertSorted} = require('../../utils/array');
const SBFLeaf = require('../SBFLeaf/SBFLeaf');
const SBFNode = require('../SBFNode/SBFNode');
/**
 * SBFTree
 *
 */
class SBFRoot {
  #tree;
  constructor(props){
    if(!props.tree){
      throw new Error(`SBFRoot is initialized without any tree referenced`);
    }
    this.#tree = props.tree;
    this.keys = (props.keys) ? props.keys : [];
    this.childrens = (props.childrens) ? props.childrens : [];
  }
  getTree(){
    return (this.#tree);
  }
  getAdapter(){
    return this.getTree().adapter;
  }
  getTreeOptions(){
    return this.getTree().options;
  }
  async insert(key, identifier = null){
    if(!this.childrens.length){
      const leaf = new SBFLeaf({parent:this});
      this.childrens.push(leaf);
      await leaf.insert(key, identifier);
    }else{
      let leafIndex = 0;
      this.keys.forEach((_key)=>{
        if(key<=_key) return;
        leafIndex++;
      });
      const leaf = this.childrens[leafIndex];
      await leaf.insert(key, identifier);
    }
    if(this.isFull()){
      this.split();
    }
  }
  async insertReferenceKey(key){
    if(this.isFull()){
      this.split();
      throw new Error('Root is full');
    }
    const index = insertSorted(this.keys, key);
    return index;
  }
  async split(){
    const midIndex = ~~(this.keys.length/2);
    const rightKeys = this.keys.splice(midIndex);
    const leftKeys = this.keys.splice(0);

    const midKey = rightKeys.splice(0,1)[0];

    const rightChildrens = this.childrens.splice(midIndex+1);
    const leftChildrens = this.childrens.splice(0);


    const right = new SBFNode({parent:this});
    right.keys = rightKeys;
    right.childrens = rightChildrens;
    rightChildrens.forEach((child)=>{
      child.setParent(right);
    })


    const left = new SBFNode({parent:this});
    left.keys = leftKeys;
    left.childrens = leftChildrens;
    leftChildrens.forEach((child)=>{
      child.setParent(left);
    })

    this.keys.push(midKey);
    this.childrens = [left, right];
  }
  async attachLeaf(index, leaf ){
    this.childrens.splice(index,0,leaf);
    leaf.setParent(this);
  }
  isFull(){
    const tree = this.getTree();
    const order = tree.options.order;
    return this.keys.length>=order;
  }
};
module.exports = SBFRoot;
