// const Data = require('../types/Data');
// const Meta = require('../types/Meta');

import Meta from "../types/Meta.js";
import Data from "../types/Data.js";

async function createLeaf(leafName) {
  if (this.leafs[leafName]) {
    throw new Error(`Leaf ${leafName} already exist.`);
  }
  this.leafs[leafName] = {
    meta: new Meta(),
    data: new Data(),
  };
}

export default createLeaf;
