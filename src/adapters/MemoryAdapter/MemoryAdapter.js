import each from 'lodash.foreach';
import Data from './types/Data.js';
import Meta from './types/Meta.js';
import splitLeaf from "./methods/splitLeaf.js";
import addInLeaf from "./methods/addInLeaf.js";
import createLeaf from "./methods/createLeaf.js";
import getAllInLeaf from "./methods/getAllInLeaf.js";
import getLeftInLeaf from "./methods/getLeftInLeaf.js";
import getRightInLeaf from "./methods/getRightInLeaf.js";
import findInLeaf from "./methods/findInLeaf.js";
import getDocument from "./methods/getDocument.js";
import openLeaf from "./methods/openLeaf.js";
import removeDocument from "./methods/removeDocument.js";
import removeInLeaf from "./methods/removeInLeaf.js";
import replaceDocument from "./methods/replaceDocument.js";
import replaceInLeaf from "./methods/replaceInLeaf.js";
import saveDocument from "./methods/saveDocument.js";

const parseLeafs = (_leafs) => {
    const leafs = {};
    each(_leafs, (_leaf, _leafId) => {
        leafs[_leafId] = {
            meta: new Meta(_leaf.meta),
            data: new Data(_leaf.data),
        };
    });
    return leafs;
};

class MemoryAdapter {
    constructor(props = {}) {
        this.name = 'MemoryAdapter';
        this.leafs = (props.leafs) ? parseLeafs(props.leafs) : {};
        this.documents = (props.documents) ? props.documents : {};
        this.isReady = true;
    }
}

MemoryAdapter.prototype.addInLeaf = addInLeaf;
MemoryAdapter.prototype.createLeaf = createLeaf;
MemoryAdapter.prototype.getAllInLeaf = getAllInLeaf;
MemoryAdapter.prototype.getLeftInLeaf = getLeftInLeaf;
MemoryAdapter.prototype.getRightInLeaf = getRightInLeaf
MemoryAdapter.prototype.findInLeaf = findInLeaf;
MemoryAdapter.prototype.getDocument = getDocument;
MemoryAdapter.prototype.openLeaf = openLeaf;
MemoryAdapter.prototype.removeDocument = removeDocument;
MemoryAdapter.prototype.removeInLeaf = removeInLeaf;
MemoryAdapter.prototype.replaceDocument = replaceDocument;
MemoryAdapter.prototype.replaceInLeaf = replaceInLeaf;
MemoryAdapter.prototype.saveDocument = saveDocument;
MemoryAdapter.prototype.splitLeaf = splitLeaf;

export default MemoryAdapter;
