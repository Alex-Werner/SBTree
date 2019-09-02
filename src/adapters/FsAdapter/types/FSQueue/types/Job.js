class Job {
  constructor(props = {}){
    if(!props.command || !props.path){
      throw new Error('Unexpected new job properties');
    }

    this.command = props.command;
    this.path = props.path;
    this.params = props.params || null;
    this.state = null;
    this.results = null;

  }

}
module.exports = Job;
