const {insertSorted} = require('../../utils/array');
const {comparatorString, comparatorNum} = require('../../utils/comparators')
const {generateRootId} = require('../../utils/crypto');
const {each}=require('lodash');
const SBFLeaf = require('../SBFLeaf/SBFLeaf');
const SBFNode = require('../SBFNode/SBFNode');

const parseChildrens = (_childrens, _parent)=>{
  const childrens = [];

  each(_childrens, (_children)=>{
    const fieldName = _children.fieldName;

      if(_children.type==='leaf'){
        childrens.push(new SBFLeaf({fieldName,parent:_parent,..._children}))
      }
      else if(_children.type==='node'){
        childrens.push(new SBFNode({fieldName,parent:_parent,..._children}))
      }
  })
  return childrens;
};
/**
 * SBFRoot
 *
 */
class SBFRoot {
  #tree;

  constructor(props) {
    if (!props.tree) {
      throw new Error(`SBFRoot is initialized without any tree referenced`);
    }
    this.#tree = props.tree;
    this.id = (props.id) ? props.id : generateRootId();

    this.fieldName = (props.tree.fieldName) ? props.tree.fieldName : null;

    this.keys = (props.keys) ? props.keys : [];
    // Used when SBFRoot holds value (when size = 0)
    this.identifiers = (props.identifiers) ? props.identifiers : [];

    this.childrens = (props.childrens) ? parseChildrens(props.childrens, this) : [];

    this.type = 'root';
  }

  getTree() {
    return (this.#tree);
  }
};
SBFRoot.prototype.attachLeaf = require('./methods/attachLeaf')
SBFRoot.prototype.find = require('./methods/find')
SBFRoot.prototype.getAll = require('./methods/getAll')
SBFRoot.prototype.get = require('./methods/get')
SBFRoot.prototype.getAdapter = require('./methods/getAdapter')
SBFRoot.prototype.getFillStatus = require('./methods/getFillStatus')
SBFRoot.prototype.getTreeOptions = require('./methods/getTreeOptions')
SBFRoot.prototype.remove = require('./methods/remove')
SBFRoot.prototype.insert = require('./methods/insert')
SBFRoot.prototype.insertReferenceKey = require('./methods/insertReferenceKey')
SBFRoot.prototype.isFull = require('./methods/isFull')
SBFRoot.prototype.split = require('./methods/split')
module.exports = SBFRoot;
