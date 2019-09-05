const {expect} = require('chai');
const query = require('../../../../src/types/SBTree/ops/query');

// await col.insert({
//   "name": "Devan",
//   "email": "Devan@Prohaska.com",
//   "_id": "5d6ebb7e21f1df6ff7482631"
// });
const fixtures = {
  documents: {
    '5d6ebb7e21f1df6ff7482631': {
      "age": 33,
      "name": "Devan",
      "email": "Devan@Prohaska.com",
      "_id": "5d6ebb7e21f1df6ff7482631"
    }
  }
};

const calledFn = [];

const fakeSelf = {
  getDocument: (docId) => fixtures.documents[docId],
  getFieldTree: (fieldName) => {
    return {
      find: (key, operator) => {
        calledFn.push([fieldName, 'find', key, operator]);
        return ['5d6ebb7e21f1df6ff7482631']
      }
    }
  }
};

describe('SBTree - ops - query', () => {
  it('should detect strict comparators', async function () {
    const res = await query.call(fakeSelf, {age: 33});
    expect(calledFn[0]).to.deep.equal(['age','find',33, '$eq']);
    // const res2 = await query.call(fakeSelf, {age: {$gte:33, $lte:50}});
    // conso
    // expect(calledFn[1]).to.deep.equal(['age','find',33, '$eq']);
  });
});
