const execCommand = require('./ops/execCommand');
/**
 *
 * @param index {default:0} - Specify which index to process
 * @returns {Promise<boolean>}
 */
module.exports = async function processNext(index=0, tries=0) {
  if(!this.queue.length){
    return false;
  }
  const job = (index===0) ? this.queue.shift() : this.queue.splice(index,1);
  const {command} = job;

  const {path, params} = job;

  // If there is a lock, we just try to process the next one
  if(this.locks[path]){
    // We can't deal with it right now. let's replace the item
    this.queue.splice(index, 0, job);

    if(this.queue.length>index+2){
      return this.processNext(1);
    }else{
      // It's locked. We have to wait. Let's retry in a few
      return await (new Promise(((resolve, reject) => {
        setTimeout(()=>{
          return resolve(this.processNext(0, tries+=1));
        }, 80)
      })));

    }
  }

  this.locks[path] = 1;

  job.state = 'processing';
  job.results = await execCommand(command,path, params);
  job.state = 'executed';
  // FIXME : Actually, it works without this, but I saw cases where .exists was returning false
  // Keeping this except requested otherwise
  setInterval(()=>{
    delete this.locks[path];
  }, 20);
  return true;
};
