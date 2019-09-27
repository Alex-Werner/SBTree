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
SFBLeaf.prototype.findAll = require('./methods/findAll');
SFBLeaf.prototype.findLowerThan = require('./methods/findLowerThan');
SFBLeaf.prototype.findGreaterThan = require('./methods/findGreaterThan');
SFBLeaf.prototype.isFull = require('./methods/isFull');
SFBLeaf.prototype.remove = require('./methods/remove');
SFBLeaf.prototype.split = require('./methods/split');
module.exports = SFBLeaf;
