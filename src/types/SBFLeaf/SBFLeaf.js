const {generateLeafName} = require('../../utils/crypto');

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
    this.name = (props.name) ? props.name : generateLeafName();
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
SFBLeaf.prototype.isFull = require('./methods/isFull');
SFBLeaf.prototype.split = require('./methods/split');
module.exports = SFBLeaf;
