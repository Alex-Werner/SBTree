const {expect} = require('chai');
const SFBLeaf = require('../../../../src/types/SBFLeaf/SBFLeaf');
const MemoryAdapter = require('../../../../src/adapters/MemoryAdapter/MemoryAdapter');
const find = require('../../../../src/types/SBFRoot/methods/find');
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
adapter.documents = {
  '5d6ebb7e21f1df6ff7482631': {_id: '5d6ebb7e21f1df6ff7482631', age: 33},
  '5d6ebb7e21f1df6ff7482621': {_id: '5d6ebb7e21f1df6ff7482621', age: 17},
  '5d6ebb7e21f1df6ff7482641': {_id: '5d6ebb7e21f1df6ff7482641', age: 45}
};
adapter.addInLeaf('16d075318572b', 'age', '5d6ebb7e21f1df6ff7482621', 17)
adapter.addInLeaf('16d07531858f6', 'age', '5d6ebb7e21f1df6ff7482631', 33)
adapter.addInLeaf('16d07531858f6', 'age', '5d6ebb7e21f1df6ff7482641', 45)
const fakeAgeTreeParent = {
  field:'age',
  getAdapter:()=> adapter,
  find:(key)=>{
    console.log('findkey',key)
  },

};
const fakeSelf = {
  keys:[33],
  childrens:[
      new SFBLeaf({ name: '16d075318572b', type: 'leaf' , parent:fakeAgeTreeParent}),
      new SFBLeaf({ name: '16d07531858f6', type: 'leaf' , parent:fakeAgeTreeParent}),
  ],
};
fakeSelf.findAll = require('../../../../src/types/SBFRoot/methods/findAll').bind(fakeSelf);

describe('SBFTree - methods - find', () => {
  //FIXME : It is too strict for string. jean should be found when we request Jean.
  it('should find using strict operator', async function () {
    const res = await find.call(fakeSelf, 33);
    const resEqOp = await find.call(fakeSelf, 33, '$eq');

    expect(res).to.deep.equal(resEqOp);
    expect(await find.call(fakeSelf, 32)).to.deep.equal([]);
    expect(await find.call(fakeSelf, 17)).to.deep.equal(['5d6ebb7e21f1df6ff7482621']);
    expect(await find.call(fakeSelf, 45)).to.deep.equal(['5d6ebb7e21f1df6ff7482641']);
  });
  it('should find using negated equality operation', async function () {
    const res = await find.call(fakeSelf, 33, '$neq');
    expect(res).to.be.deep.equal([ '5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482641' ])
  });
  // it('should detect strict operators', async function () {
  //   const res = await query.call(fakeSelf, {age: 33});
  //   expect(calledFn[0]).to.deep.equal(['age','find',33, '$eq']);
  // });
  // it('should detect other operators', async function () {
  //   const res2 = await query.call(fakeSelf, {age: {$gte:33, $lte:50}});
  //   expect(calledFn[1]).to.deep.equal(['age','find',33, '$gte']);
  //   expect(calledFn[2]).to.deep.equal(['age','find',50, '$lte']);
  // });
  // it('should detect nested object', async function () {
  //   //TODO
  //   // const res3 = await query.call(fakeSelf, {address: {country:{$in:['France', 'Russia']}}});
  //
  // });
});
