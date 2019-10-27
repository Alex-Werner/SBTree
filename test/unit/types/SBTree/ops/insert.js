const {expect} = require('chai');
const insert = require('../../../../../src/types/SBTree/ops/insert');
const {expectThrowsAsync} = require('../../../../test.utils');
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
  setFieldTree: (fieldOps) => {
    const {fieldName} = fieldOps
    calledFn.push(['setFieldTree', fieldName]);
  },
  getFieldTree: (fieldName) => {
    calledFn.push(['getFieldTree', fieldName]);
    // return {
    //   get
    // }
  }
};

describe('SBTree - ops - insert', () => {
  it('should insert an object', async function () {
    const doc = fixtures.documents[Object.keys(fixtures.documents)[0]];
    const insertedDocument = await insert.call(fakeSelf, doc);
    expect(calledFn).to.deep.equal([
      ['getFieldTree', 'age'],
      ['setFieldTree', 'age'],
      ['getFieldTree', 'age'],

      ['getFieldTree', 'name'],
      ['setFieldTree', 'name'],
      ['getFieldTree', 'name'],

      ['getFieldTree', 'email'],
      ['setFieldTree', 'email'],
      ['getFieldTree', 'email'],

      ['getFieldTree', 'address.country'],
      ['setFieldTree', 'address.country'],
      ['getFieldTree', 'address.country'],

      // Address is not called as we discard it (type is object)
      ['savedDocument', '5d6ebb7e21f1df6ff7482631'],
    ]);
  });
  it('should not insert with no _id', async function () {
    const doc = {
      name: 'Nothing'
    };
    const exceptedException = 'Expecting all document to have an _id';
    await expectThrowsAsync(async () => await insert.call(fakeSelf, doc), exceptedException)
  });
});
