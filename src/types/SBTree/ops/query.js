const {map, each, intersection} = require('lodash');

const get = require('./get');
async function query(query) {
  const self = this;
  let listOfFieldLookup = [];
  if(query._id){
    const {_id} = query;
    return get.call(this,_id)
  }
  await Promise.all(map(query, async (queryFieldValue, queryFieldName) => {
        const value = await this.getFieldTree(queryFieldName).find(queryFieldValue);
        if (value) {
          listOfFieldLookup = listOfFieldLookup.concat(value)
        } else {
          throw new Error(`No field ${queryFieldName} found`)
        }
      }
  ));
  const matchingObjectIds = intersection(listOfFieldLookup);
  const documents = [];

  await Promise.all(map(matchingObjectIds, async (oid) => {
        const doc = await self.getDocument(oid);
        documents.push(doc);
      }
  ));
  return documents;
};
module.exports = query;
