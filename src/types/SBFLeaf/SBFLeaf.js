const {generateLeafId} = require('../../utils/crypto');

/**
 * SFBLeaf
 *
 */
class SFBLeaf {
  #parent
  constructor(props){
    if(!props.parent){
      throw new Error(`SFBLeaf initialized without parent reference`)
    }

    this.#parent = props.parent;
    this.id = (props.id) ? props.id : generateLeafId();
    this.fieldName = (props.parent.fieldName) ? props.parent.fieldName : null;
    this.type = 'leaf';
  }
  getParent(){
    return this.#parent;
  }
  setParent(parent){
    this.#parent = parent
  }
};
SFBLeaf.prototype.insert = require('./methods/insert');
SFBLeaf.prototype.find = require('./methods/find');
SFBLeaf.prototype.getAll = require('./methods/getAll');
SFBLeaf.prototype.getFillStatus = require('./methods/getFillStatus');
SFBLeaf.prototype.getLeft = require('./methods/getLeft');
SFBLeaf.prototype.getRight = require('./methods/getRight');
SFBLeaf.prototype.findLowerThan = require('./methods/findLowerThan');
SFBLeaf.prototype.findGreaterThan = require('./methods/findGreaterThan');
SFBLeaf.prototype.isFillFactorFilled = require('./methods/isFillFactorFilled');
SFBLeaf.prototype.isFull = require('./methods/isFull');
SFBLeaf.prototype.mergeWithSiblings = require('./methods/mergeWithSiblings');
SFBLeaf.prototype.redistribute = require('./methods/redistribute');
SFBLeaf.prototype.remove = require('./methods/remove');
SFBLeaf.prototype.replace = require('./methods/replace');
SFBLeaf.prototype.split = require('./methods/split');
module.exports = SFBLeaf;
