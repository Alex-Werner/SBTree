const defaultProps = {
  options:{
    autoexec:true,
    concurrency: null,//Infinite concurrent processes
    timeout: 5000 //MS wait for execution
  }
}
/**
 * FSQueue
 *
 * Simple Queue system that deals with FS.
 *
 * Ideally, we should have way to add to the
 *
 */
class FSQueue{
  constructor(props = {}){
    this.queue = [];
    this.locks = {};
    this.options = {
      autoexec: (props.autoexec!==null) ? props.autoexec : defaultProps.options.autoexec
    }
  }
};
// Elements added to the queue will then need to be executed with manually except if autoexec
// Return a job
FSQueue.prototype.add = require('./methods/add');
FSQueue.prototype.get = require('./methods/get');
FSQueue.prototype.processNext = require('./methods/processNext');

// Remove last job in queue
// FSQueue.prototype.pop = require('./methods/pop');

// Get position of job in queue
// FSQueue.prototype.indexOf = require('./methods/indexOf');

// Try to execute a passed job in first
// FSQueue.prototype.exec = require('./methods/exec');
module.exports = FSQueue;
