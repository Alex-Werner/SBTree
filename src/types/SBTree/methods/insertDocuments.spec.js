import { expect } from 'chai';
import insertDocuments from './insertDocuments.js';
const doc1 = {
  value: 'Sunny sun'
};

const docNb1 = {
  number: 1
};
const docNb2 = {
  number: 2
};
const docNb3 = {
  number: 3
};
const mock = {
  getFieldTree: ()=> {},
  setFieldTree: ()=> {},
  insertDocuments,
  adapter:{
    saveDocument: ()=> {}
  },
  state:{
    isReady: true
  },
}

describe('.insertDocuments', ()=>{
  it('should insert a single document', async function () {
    const insert = await insertDocuments.call(mock, doc1);
    expect(insert.length).to.equal(1);
    expect(insert[0].value).to.deep.equal(doc1.value);
    expect(insert[0]._id).to.be.an('string');
  });
  it('should insert multiple documents', async function () {
    const insertMultiples = await insertDocuments.call(mock, [docNb1, docNb2, docNb3]);

    expect(insertMultiples.length).to.equal(3);

    expect(insertMultiples[0].number).to.deep.equal(docNb1.number);
    expect(insertMultiples[0]._id).to.be.an('string');

    expect(insertMultiples[1].number).to.deep.equal(docNb2.number);
    expect(insertMultiples[1]._id).to.be.an('string');

    expect(insertMultiples[2].number).to.deep.equal(docNb3.number);
    expect(insertMultiples[2]._id).to.be.an('string');

  });
});
