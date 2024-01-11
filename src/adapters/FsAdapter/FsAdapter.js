import attachParent from "./methods/attachParent.js";
import addInLeaf from "./methods/addInLeaf.js";
import createLeaf from "./methods/createLeaf.js";
import findInLeaf from "./methods/findInLeaf.js";
import getAllInLeaf from "./methods/getAllInLeaf.js";
import getLeftInLeaf from "./methods/getLeftInLeaf.js";
import getRightInLeaf from "./methods/getRightInLeaf.js";
import getDocument from "./methods/getDocument.js";
import insertSortedInLeaf from "./methods/insertSortedInLeaf.js";
import loadDatabase from "./methods/loadDatabase.js";
import openDocument from "./methods/openDocument.js";
import openLeaf from "./methods/openLeaf.js";
import removeDocument from "./methods/removeDocument.js";
import openLeafData from "./methods/openLeafData.js";
import replaceDocument from "./methods/replaceDocument.js";
import replaceInLeaf from "./methods/replaceInLeaf.js";
import saveDatabase from "./methods/saveDatabase.js";
import saveDocument from "./methods/saveDocument.js";
import saveLeafData from "./methods/saveLeafData.js";
import splitLeaf from "./methods/splitLeaf.js";
import updateDocument from "./methods/updateDocument.js";

import {FSLock} from 'fslockjs';
import EventEmitter from 'events';

const defaultProps = {
    path: '.db',
    //TODO : Ideally, when false, we keep a set of deferred job that we execute once saveDatabase is called.
    autoSave: true,
    autoSaveInterval: 5000,
    autoLoad: true,
    autoLoadCallback: null,
}

class FsAdapter extends EventEmitter {
  #parent;
  constructor(props = {}) {
    super();
    this.name = "FsAdapter";

    if(props.parent){
      this.setParent(props.parent)
    }
    this.leafs = (props.leafs) ? props.leafs : {};
    this.path= (props.path) ? (props.path) : defaultProps.path;
    this.autoSave= (props.autoSave !== undefined) ? (props.autoSave) : defaultProps.autoSave;
    this.autoSaveInterval= (props.autoSaveInterval !== undefined) ? (props.autoSaveInterval) : defaultProps.autoSaveInterval;
    this.autoLoad= (props.autoLoad !== undefined) ? (props.autoLoad) : defaultProps.autoLoad;
    this.autoLoadCallback= (props.autoLoadCallback !== undefined) ? (props.autoLoadCallback) : defaultProps.autoLoadCallback;

    if (!this.autoLoad && this.autoLoadForceOverwrite === undefined) {
      throw new Error('Not implemented : Overwrite graceful handle. Pass autoLoadForceOverwrite to force.');
    }
    this.lastChange = null;
    this.lastSave = null;
    this.queue = new FSLock();
    this.isReady = true;
    if(props.leafs){
      this.isReady = false;
    }
  }
  setParent(parent){
    this.#parent = parent;
  }
  getParent(){
    return this.#parent;
  }
};
//TODO : Optimization possible by just removing the LeafMeta from memory for disk instead, but existance search will be slower.
//TODO : LRU Cache

FsAdapter.prototype.attachParent = attachParent;
FsAdapter.prototype.addInLeaf = addInLeaf;
FsAdapter.prototype.createLeaf = createLeaf;
FsAdapter.prototype.findInLeaf = findInLeaf;
FsAdapter.prototype.getAllInLeaf = getAllInLeaf;
FsAdapter.prototype.getLeftInLeaf = getLeftInLeaf;
FsAdapter.prototype.getRightInLeaf = getRightInLeaf;
FsAdapter.prototype.getDocument = getDocument;
FsAdapter.prototype.insertSortedInLeaf = insertSortedInLeaf;
FsAdapter.prototype.loadDatabase = loadDatabase;
FsAdapter.prototype.openDocument = openDocument;
FsAdapter.prototype.openLeaf = openLeaf;
FsAdapter.prototype.removeDocument = removeDocument;
FsAdapter.prototype.openLeafData = openLeafData;
FsAdapter.prototype.replaceDocument = replaceDocument;
FsAdapter.prototype.replaceInLeaf = replaceInLeaf;
FsAdapter.prototype.saveDatabase = saveDatabase;
FsAdapter.prototype.saveDocument = saveDocument;
FsAdapter.prototype.saveLeafData = saveLeafData;
FsAdapter.prototype.splitLeaf = splitLeaf;
FsAdapter.prototype.updateDocument = updateDocument;
export default FsAdapter;
