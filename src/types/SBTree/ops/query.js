const {intersection} = require('lodash');

const get = require('./get');

async function resolveDocuments(self, objectIds) {
  const documents = [];
  for (const oid of objectIds) {
    const doc = await self.getDocument(oid);
    documents.push(doc);
  }
  return documents;
}
const findIntersectingIdentifiers = (listOfFind)=>{
  const identifiers = [];

  listOfFind.forEach((fieldRes)=>{
    identifiers.push(...fieldRes.identifiers)
  })
  return intersection(identifiers);
}

async function query(query) {
  const self = this;
  let listOfFieldLookup = [];
  if(query===undefined) return [];
  if (query._id && Object.keys(query).length === 1) {
    const {_id} = query;
    return [await get.call(this, _id)]
  }
  for (const queryFieldName in query) {
    let fieldLookup = []
    const queryFieldValue = query[queryFieldName];
    const fieldTree = this.getFieldTree(queryFieldName);
    if (!fieldTree) {
      continue;
    }

    // We try to look up the easy cases, strict equality
    const queryFieldType = typeof queryFieldValue
    if (['string', 'number'].includes(queryFieldType)) {

      let operator = '$eq';
      const value = await fieldTree.find(queryFieldValue, operator);

      if (value) {
        value.fieldName = queryFieldName;
        fieldLookup = fieldLookup.concat(value)
      } else {
        throw new Error(`No value ${queryFieldName} found : ${value}, query(${JSON.stringify(query)})`)
      }
    } else {
      if (Array.isArray(queryFieldValue)) throw new Error(`Not supported array input. Please open a Github issue to specify your need.`);
      if (queryFieldType === "object" && !Array.isArray(queryFieldValue)) {
        const operators = Object.keys(queryFieldValue).filter((el) => el[0] === '$');

        // TODO : Move to Promise.all. Expect changes, no point to not parallel the calls. We use this for now.
        let p = [];
        for (let operator of operators) {
          p.push(fieldTree.find(queryFieldValue[operator], operator));
        }

        await Promise.all(p).then((value)=>{
          if (value) {
            value.fieldName = queryFieldName;
            fieldLookup = fieldLookup.concat(value)
          } else {
            throw new Error(`No value ${queryFieldName} found : ${value}, query(${JSON.stringify(query)})`)
          }
        });
      }
    }

    listOfFieldLookup = listOfFieldLookup.concat(fieldLookup);
  }
  const matchingObjectIds = findIntersectingIdentifiers(listOfFieldLookup);
  const documents = await resolveDocuments(self, matchingObjectIds);
  return documents;
};
module.exports = query;
