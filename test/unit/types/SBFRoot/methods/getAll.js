const {expect} = require('chai');
const SFBLeaf = require('../../../../../src/types/SBFLeaf/SBFLeaf');
const MemoryAdapter = require('../../../../../src/adapters/MemoryAdapter/MemoryAdapter');
const getAll = require('../../../../../src/types/SBFRoot/methods/getAll');
const fixtures = {
  documents: {
    // '5d6ebb7e21f1df6ff7482631': {
    //   "age": 33,
    //   "name": "Devan",
    //   "email": "Devan@Prohaska.com",
    //   "address":{
    //     "country":'Russia'
    //   },
    //   "_id": "5d6ebb7e21f1df6ff7482631"
    // },
    '5d6ebb7e21f1df6ff7482631':{
      "age": 33,
      "name": "Devan",
      "_id": "5d6ebb7e21f1df6ff7482631"
    },
    '5d6ebb7e21f1df6ff7482621':{
      "age": 17,
      "name": "Silvio",
      "_id": "5d6ebb7e21f1df6ff7482621"
    },
    "5d6ebb7e21f1df6ff7482641":{
      "age": 45,
      "name": "Patricia",
      "_id": "5d6ebb7e21f1df6ff7482641"
    }
  }
};

const calledFn = [];

const adapter = new MemoryAdapter();

const fakeAgeTreeParent = {
  fieldName:'age',
  getAdapter:()=> adapter,
  find:(key)=>{
    console.log('findkey',key)
  },

};
const fakeSelf = {
  id: '16d72f309846d',
  fieldName:'age',
  keys:[33],
  childrens:[
    new SFBLeaf({ id: 'l16da4db23936c37368a', type: 'leaf' , parent:fakeAgeTreeParent}),
    new SFBLeaf({ id: 'l16da4db23930ae17477', type: 'leaf' , parent:fakeAgeTreeParent}),
  ],
};

describe('SBFTree - methods - getAll', () => {
  before(async ()=>{
    await adapter.addInLeaf('l16da4db23936c37368a', '5d6ebb7e21f1df6ff7482621', 17)
    await adapter.saveDocument({_id: '5d6ebb7e21f1df6ff7482621', age: 17})

    await adapter.addInLeaf('l16da4db23930ae17477', '5d6ebb7e21f1df6ff7482631', 33)
    await adapter.saveDocument({_id: '5d6ebb7e21f1df6ff7482631', age: 33})

    await adapter.addInLeaf('l16da4db23930ae17477', '5d6ebb7e21f1df6ff7482641', 45)
    await adapter.saveDocument({_id: '5d6ebb7e21f1df6ff7482641', age: 45})
  })
  it('should get all identifiers', async function () {
    const res = await getAll.call(fakeSelf);
    const expectedRes = {
      identifiers:Object.keys(adapter.documents),
      keys:[17,33,45]
    }

    expect(res).to.deep.equal(expectedRes);
  });
});
