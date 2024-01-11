import { expect } from 'chai';
const getSpec = require('./get');

const idFixtureDoc = '5d6ebb7e21f1df6ff7482631'
const fixtures = {
  documents: {
    '5d6ebb7e21f1df6ff7482631': {
      "age": 33,
      "name": "Devan",
      "email": "Devan@Prohaska.com",
      "address":{
        "country":'Russia'
      },
      "_id": "5d6ebb7e21f1df6ff7482631"
    }
  }
};

const calledFn = [];

const fakeSelf = {
  adapter:{
    getDocument:(docId) => fixtures.documents[docId]
  },
  getFieldTree: (fieldName) => {
    // return {
    //   get
    // }
  }
};

describe('SBTree - ops - get', () => {
  it('should get an object', async function () {
    const gotDocument = await getSpec.call(fakeSelf, idFixtureDoc);
    expect(gotDocument).to.deep.equal(fixtures.documents[idFixtureDoc]);
  });
  it('should gracefully not return an unexisting document', async function () {
    const gotDocument = await getSpec.call(fakeSelf, `${idFixtureDoc}fake`);
    expect(gotDocument).to.be.deep.equal(null)
  });
});
