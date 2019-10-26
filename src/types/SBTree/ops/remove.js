const query = require('./query')

const RemoveCommand = require('./RemoveCommand');

async function remove(_query) {
  const results = await query.call(this, _query)
  for (const result of results) {
    //TODO : This can be improved.
    // Indeed, if the loop would happen in the adapter itself
    // We would need less computation to perform the deletion task.
    const remCmd = new RemoveCommand(result);
    for (const _fieldName of remCmd.fields) {
        const fieldNode = this.getFieldTree(_fieldName);

        await fieldNode.remove(remCmd);

        // Remove documents
        await (this.getAdapter()).removeDocument(remCmd._id);
    }
  }

  return results;
};
module.exports = remove;
