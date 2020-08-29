const intersection = require('lodash.intersection');

const get = require('./get');

async function resolveDocuments(self, objectIds) {
  const documents = [];
  for (const oid of objectIds) {
    const doc = await self.getDocument(oid);
    documents.push(doc);
  }
  return documents;
}

const findIntersectingIdentifiers = (listOfListOfIdentifiers) => {
  const identifiers = [];

  listOfListOfIdentifiers.forEach((listOfIdentifiers) => {
    identifiers.push(listOfIdentifiers);
  });
  return intersection(...identifiers);
};

async function query(query) {
  const self = this;
  const findNested = async function (_promises, _queryFieldName, _queryFieldValue) {
    for (const nestedQueryFieldName in _queryFieldValue) {
      const nestedQueryFieldValue = _queryFieldValue[nestedQueryFieldName];
      const nestedQueryFieldType = typeof nestedQueryFieldValue;

      if (['number', 'string', 'boolean'].includes(nestedQueryFieldType)) {
        const fTree = self.getFieldTree(`${_queryFieldName}.${nestedQueryFieldName}`);
        // Sometimes, like when excluded, this can not resolve.
        if (fTree) {
          _promises.push(fTree.find(nestedQueryFieldValue, '$eq'));
        }
      } else if (nestedQueryFieldType === 'object' && !Array.isArray(nestedQueryFieldValue)) {
        await findNested(_promises, `${_queryFieldName}.${nestedQueryFieldName}`, nestedQueryFieldValue);
      } else {
        throw new Error(`Not supported type : ${nestedQueryFieldType}`);
      }
    }
  };

  const fields = Object.keys(query);
  const fieldsResults = {};
  const result = [];

  // When our search is based on _id and only _id, we can just get document.
  if (fields.length === 1 && fields.indexOf('_id') > -1) {
    return [await get.call(this, query._id)];
  }

  const promises = [];

  fields.forEach((queryFieldName) => {
    const queryFieldValue = query[queryFieldName];
    const queryFieldType = typeof queryFieldValue;

    let fieldTree;

    switch (queryFieldType) {
      case 'number':
      case 'boolean':
      case 'string':
        fieldTree = this.getFieldTree(queryFieldName);
        if (!fieldTree) {
          return;
        }
        promises.push(fieldTree.find(queryFieldValue, '$eq'));
        break;
      case 'object':
        if (Array.isArray(queryFieldValue)) {
          throw new Error('Not supported array input. Please open a Github issue to specify your need.');
        } else {
          const operators = Object.keys(queryFieldValue).filter((el) => el[0] === '$');

          if (operators.length === 0) {
            // Then we iterate on values to perform find on all trees of nested object
            findNested(promises, queryFieldName, queryFieldValue);
          } else {
            fieldTree = this.getFieldTree(queryFieldName);
            for (const operator of operators) {
              promises.push(fieldTree.find(queryFieldValue[operator], operator));
            }
          }
        }
        break;
      default:
        throw new Error(`Not supported type : ${queryFieldType}`);
    }
  });

  let intermediateIdentifiers = [];
  await Promise
    .all(promises)
    .then((pResults) => {
      for (const pResult of pResults) {
        // Whenever we sees that, we can quickly answer an empty response, as [] intersect with nothing.
        if (pResult.identifiers.length === 0) {
          // We remove any previous findings
          intermediateIdentifiers = [];
          break;
        }
        intermediateIdentifiers.push(pResult.identifiers);
      }
    });

  const matchingObjectIds = findIntersectingIdentifiers(intermediateIdentifiers);
  return resolveDocuments(this, matchingObjectIds);
}

module.exports = query;
