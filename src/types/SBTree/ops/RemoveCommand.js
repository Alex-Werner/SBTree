class RemoveCommand {
  constructor(res) {
    this._id = res._id;

    this.fields = Object.keys(res).filter((_f) => _f !== '_id');
    this.query = res;
  }
}
module.exports = RemoveCommand;
