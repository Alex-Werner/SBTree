const query = require('./query');

const RemoveCommand = require('./RemoveCommand');

async function remove(_query) {
  const self = this;
  const removeNestedProp = async function (_fieldName, _fieldValue, _remCmd) {
    const _fieldValueType = typeof _fieldValue;
    if (['number', 'string', 'boolean', 'object'].includes(_fieldValueType)) {
      const fieldNode = self.getFieldTree(_fieldName);
      if (fieldNode === undefined) {
        throw new Error('Field do not exist');
      }
      try {
        await fieldNode.remove(_remCmd);
      } catch (err) {
        // FIXME: Can be due to already deleted or bug. We need to handle crafted bug properly
      }
    } else if (_fieldValueType === 'object' && !Array.isArray(_fieldValue)) {
      for (const _nestedFieldName in _fieldValue) {
        const _nestedFieldValue = _fieldValue[_nestedFieldName];
        await removeNestedProp(`${_fieldName}.${_nestedFieldName}`, _nestedFieldValue, _remCmd);
      }
    } else {
      throw new Error(`Unsupported type ${_fieldValueType}`);
    }
  };
  const results = await query.call(this, _query);
  if(results !== null){
    for (const result of results) {
      // TODO : This can be improved.
      // Indeed, if the loop would happen in the adapter itself
      // We would need less computation to perform the deletion task.
      if(result !== null){
      const remCmd = new RemoveCommand(result);
        for (const _fieldName of remCmd.fields) {
          const _fieldValue = remCmd.query[_fieldName];
          const _fieldValType = typeof _fieldValue;

          if (['number', 'string', 'boolean'].includes(_fieldValType)) {
            const fieldNode = this.getFieldTree(_fieldName);
            await fieldNode.remove(remCmd);
          } else if (_fieldValType === 'object' && !Array.isArray(_fieldValue)) {
            for (const _nestedFieldName in _fieldValue) {
              const _nestedFieldValue = _fieldValue[_nestedFieldName];
              try {
                await removeNestedProp(`${_fieldName}.${_nestedFieldName}`, _nestedFieldValue, remCmd);
              } catch (e) {
                switch (e.message) {
                  case 'Field do not exist':
                    // Already deletedd probably
                    break;
                  default: throw e;
                }
              }
            }
          } else {
            throw new Error(`Unsupported type ${_fieldValType}`);
          }

          // Remove documents
          await (this.getAdapter()).removeDocument(remCmd._id);
        }

      }
    }
  }

  return results;
}
export default remove;
