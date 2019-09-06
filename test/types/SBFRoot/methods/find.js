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
    expect(res).to.deep.equal(['5d6ebb7e21f1df6ff7482631']);
    expect(await find.call(fakeSelf, 32)).to.deep.equal([]);
    expect(await find.call(fakeSelf, 17)).to.deep.equal(['5d6ebb7e21f1df6ff7482621']);
    expect(await find.call(fakeSelf, 45)).to.deep.equal(['5d6ebb7e21f1df6ff7482641']);
  });
  it('should find using negated equality operation', async function () {
    const res = await find.call(fakeSelf, 33, '$neq');
    expect(res).to.be.deep.equal([ '5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482641' ])
  });
  it('should find using lower than operators', async function () {
    const res = await find.call(fakeSelf, 1, '$lt');
    expect(res).to.be.deep.equal([ ])
    const res2 = await find.call(fakeSelf, 100, '$lt');
    expect(res2).to.be.deep.equal(['5d6ebb7e21f1df6ff7482621','5d6ebb7e21f1df6ff7482631','5d6ebb7e21f1df6ff7482641' ])
    const res3 = await find.call(fakeSelf, 33, '$lt');
    expect(res3).to.be.deep.equal([ '5d6ebb7e21f1df6ff7482621' ])
    const res4 = await find.call(fakeSelf, 34, '$lt');
    expect(res4).to.be.deep.equal([ '5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631' ])
  });
  it('should find using lower than or equal operators', async function () {
    const res = await find.call(fakeSelf, 1, '$lte');
    expect(res).to.be.deep.equal([ ])
    const res2 = await find.call(fakeSelf, 100, '$lte');
    expect(res2).to.be.deep.equal(['5d6ebb7e21f1df6ff7482621','5d6ebb7e21f1df6ff7482631','5d6ebb7e21f1df6ff7482641' ])
    const res3 = await find.call(fakeSelf, 17, '$lte');
    expect(res3).to.be.deep.equal([ '5d6ebb7e21f1df6ff7482621'])
    const res4 = await find.call(fakeSelf, 34, '$lte');
    expect(res4).to.be.deep.equal([ '5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631' ])

    const res5 = await find.call(fakeSelf, 33, '$lte');
    expect(res5).to.be.deep.equal([ '5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631' ])
  });
  it('should find using greater than operators', async function (){
    const res = await find.call(fakeSelf, 1, '$gt');
    expect(res).to.be.deep.equal(['5d6ebb7e21f1df6ff7482621','5d6ebb7e21f1df6ff7482631','5d6ebb7e21f1df6ff7482641' ])
    const res2 = await find.call(fakeSelf, 100, '$gt');
    expect(res2).to.be.deep.equal([ ])
    const res3 = await find.call(fakeSelf, 16, '$gt');
    expect(res3).to.be.deep.equal(['5d6ebb7e21f1df6ff7482621','5d6ebb7e21f1df6ff7482631','5d6ebb7e21f1df6ff7482641' ])
    const res4 = await find.call(fakeSelf, 17, '$gt');
    expect(res4).to.be.deep.equal(['5d6ebb7e21f1df6ff7482631','5d6ebb7e21f1df6ff7482641' ])
    const res5 = await find.call(fakeSelf, 32, '$gt');
    expect(res5).to.be.deep.equal(['5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641' ])
    const res6 = await find.call(fakeSelf, 33, '$gt');
    expect(res6).to.be.deep.equal([  '5d6ebb7e21f1df6ff7482641' ])
    const res7 = await find.call(fakeSelf, 44, '$gt');
    expect(res7).to.be.deep.equal([  '5d6ebb7e21f1df6ff7482641' ])
    const res8 = await find.call(fakeSelf, 45, '$gt');
    expect(res8).to.be.deep.equal([   ])
  });
  it('should find using greater than or equal operators', async function (){
    const res = await find.call(fakeSelf, 1, '$gte');
    expect(res).to.be.deep.equal(['5d6ebb7e21f1df6ff7482621','5d6ebb7e21f1df6ff7482631','5d6ebb7e21f1df6ff7482641' ])
    const res2 = await find.call(fakeSelf, 100, '$gte');
    expect(res2).to.be.deep.equal([ ])
    const res3 = await find.call(fakeSelf, 16, '$gte');
    expect(res3).to.be.deep.equal(['5d6ebb7e21f1df6ff7482621','5d6ebb7e21f1df6ff7482631','5d6ebb7e21f1df6ff7482641' ])
    const res4 = await find.call(fakeSelf, 17, '$gte');
    expect(res4).to.be.deep.equal(['5d6ebb7e21f1df6ff7482621','5d6ebb7e21f1df6ff7482631','5d6ebb7e21f1df6ff7482641' ])
    const res5 = await find.call(fakeSelf, 32, '$gte');
    expect(res5).to.be.deep.equal(['5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641' ])
    const res6 = await find.call(fakeSelf, 33, '$gte');
    expect(res6).to.be.deep.equal([ '5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641' ])
    const res7 = await find.call(fakeSelf, 44, '$gte');
    expect(res7).to.be.deep.equal([  '5d6ebb7e21f1df6ff7482641' ])
    const res8 = await find.call(fakeSelf, 45, '$gte');
    expect(res8).to.be.deep.equal([ '5d6ebb7e21f1df6ff7482641'  ])
    const res9 = await find.call(fakeSelf, 46, '$gte');
    expect(res9).to.be.deep.equal([   ])

  });


  // it('should detect nested object', async function () {
  //   //TODO
  //   // const res3 = await query.call(fakeSelf, {address: {country:{$in:['France', 'Russia']}}});
  //
  // });
});
