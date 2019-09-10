const {expect} = require('chai');
const remove = require('../../../../src/types/SBTree/ops/remove');

const fixtures = {
  documents: {
    '5d6ebb7e21f1df6ff7482631': {
      "age": 33,
      "name": "Devan",
      "email": "Devan@Prohaska.com",
      "address": {
        "country": 'Russia'
      },
      "_id": "5d6ebb7e21f1df6ff7482631"
    }
  }
};

const calledFn = [];

const fakeSelf = {
  adapter: {
    getDocument: (docId) => fixtures.documents[docId],
    saveDocument: (doc) => calledFn.push(['savedDocument', doc._id])
  },
  setFieldTree: (fieldName) => {
    calledFn.push(['setFieldTree', fieldName]);
  },
  getFieldTree: (fieldName) => {
    calledFn.push(['getFieldTree', fieldName]);
    // return {
    //   get
    // }
  }
};

describe('SBTree - ops - remove', () => {
  it('should remove an inserted object by it\'s id', async function () {
      // const removedDoc = remove.call();
  });
  it('should remove an inserted object by it\'s it', async function () {
    // const removedDoc = remove.call();
  });
  it('should fail to remove an non existing object', async function () {
  });
});
