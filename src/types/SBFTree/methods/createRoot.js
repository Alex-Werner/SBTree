const SBFRoot = require('../../SBFRoot/SBFRoot');
module.exports = function createRoot(){
  if(this.root){
    throw new Error("Already existing root.");
  }
  this.root = new SBFRoot({tree:this});
};
