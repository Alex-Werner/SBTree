const {map, each, intersection} = require('lodash');

const get = require('./get');

async function query(query) {
  const self = this;
  let listOfFieldLookup = [];
  if (query._id) {
    const {_id} = query;
    return get.call(this, _id)
  }

  for(const queryFieldName in query){
    const queryFieldValue = query[queryFieldName];
    if (!this.getFieldTree(queryFieldName)) {
      continue;
      // throw new Error(`No field ${queryFieldName} found`)
    }
    const value = await this.getFieldTree(queryFieldName).find(queryFieldValue);
    if (value) {
      listOfFieldLookup = listOfFieldLookup.concat(value)
    } else {

      throw new Error(`No value ${queryFieldName} found : ${value}, ${query}`)

    }
  }

  const matchingObjectIds = intersection(listOfFieldLookup);
  const documents = [];

  for(const oid of matchingObjectIds){
    const doc = await self.getDocument(oid);
    documents.push(doc);
  }

  return documents;
};
module.exports = query;
