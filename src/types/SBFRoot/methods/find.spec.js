const {expect} = require('chai');
const SFBLeaf = require('../../SBFLeaf/SBFLeaf');
const MemoryAdapter = require('../../../adapters/MemoryAdapter/MemoryAdapter');
const find = require('../../SBFRoot/methods/find');
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
    '5d6ebb7e21f1df6ff7482631': {
      "age": 33,
      "name": "Devan",
      "_id": "5d6ebb7e21f1df6ff7482631"
    },
    '5d6ebb7e21f1df6ff7482621': {
      "age": 17,
      "name": "Silvio",
      "_id": "5d6ebb7e21f1df6ff7482621"
    },
    "5d6ebb7e21f1df6ff7482641": {
      "age": 45,
      "name": "Patricia",
      "_id": "5d6ebb7e21f1df6ff7482641"
    }
  }
};

const calledFn = [];

const adapter = new MemoryAdapter();

const fakeAgeTreeParent = {
  fieldName: 'age',
  getAdapter: () => adapter,
  find: (key) => {
    console.log('findkey', key)
  },

};
const fakeSelf = {
  keys: [33],
  identifiers: [],
  childrens: [
    new SFBLeaf({id: 'l16da4db23936c37368a', type: 'leaf', parent: fakeAgeTreeParent}),
    new SFBLeaf({id: 'l16da4db23930ae17477', type: 'leaf', parent: fakeAgeTreeParent}),
  ],
  find
};
fakeSelf.getAll = require('../methods/getAll').bind(fakeSelf);

describe('SBFRoot - methods - find', () => {
  before(async () => {
    await adapter.addInLeaf('l16da4db23936c37368a', '5d6ebb7e21f1df6ff7482621', 17)
    await adapter.saveDocument({_id: '5d6ebb7e21f1df6ff7482621', age: 17})

    await adapter.addInLeaf('l16da4db23930ae17477', '5d6ebb7e21f1df6ff7482631', 33)
    await adapter.saveDocument({_id: '5d6ebb7e21f1df6ff7482631', age: 33})

    await adapter.addInLeaf('l16da4db23930ae17477', '5d6ebb7e21f1df6ff7482641', 45)
    await adapter.saveDocument({_id: '5d6ebb7e21f1df6ff7482641', age: 45})

  })
  //FIXME : It is too strict for string. jean should be found when we request Jean.
  // it('should find using strict operator', async function () {
  //   const res = await find.call(fakeSelf, 33);
  //   const resEqOp = await find.call(fakeSelf, 33, '$eq');
  //   expect(res).to.deep.equal(resEqOp);
  //   console.log(res)
  //   expect(res).to.deep.equal({identifiers:['5d6ebb7e21f1df6ff7482631'],keys:[33]});
  //   expect(await find.call(fakeSelf, 32)).to.deep.equal({identifiers:[],keys:[]});
  //   expect(await find.call(fakeSelf, 17)).to.deep.equal({identifiers:['5d6ebb7e21f1df6ff7482621'],keys:[17]});
  //   expect(await find.call(fakeSelf, 45)).to.deep.equal({identifiers:['5d6ebb7e21f1df6ff7482641'],keys:[45]});
  // });
  // it('should find using negated equality operation', async function () {
  //   const res = await find.call(fakeSelf, 33, '$ne');
  //   expect(res).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482641'],
  //     keys: [17, 45]
  //   })
  // });
  //
  // it('should find using lower than operators', async function () {
  //   const res = await find.call(fakeSelf, 1, '$lt');
  //   expect(res).to.be.deep.equal({identifiers:[], keys:[]})
  //   const res2 = await find.call(fakeSelf, 100, '$lt');
  //   expect(res2).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
  //     keys: [17, 33, 45]
  //   })
  //   const res3 = await find.call(fakeSelf, 33, '$lt');
  //   expect(res3).to.be.deep.equal({identifiers:['5d6ebb7e21f1df6ff7482621'],keys:[17]})
  //   const res4 = await find.call(fakeSelf, 34, '$lt');
  //   expect(res4).to.be.deep.equal({identifiers:['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631'],keys:[17,33]})
  // });
  //
  // it('should find using lower than or equal operators', async function () {
  //   const res = await find.call(fakeSelf, 1, '$lte');
  //   expect(res).to.be.deep.equal({identifiers: [], keys: []})
  //   const res2 = await find.call(fakeSelf, 100, '$lte');
  //   expect(res2).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
  //     keys: [17, 33, 45]
  //   })
  //   const res3 = await find.call(fakeSelf, 17, '$lte');
  //   expect(res3).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482621'],
  //     keys: [17]
  //   })
  //   const res4 = await find.call(fakeSelf, 34, '$lte');
  //   expect(res4).to.be.deep.equal(
  //       {
  //         identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631'],
  //         keys: [17, 33]
  //       })
  //
  //   const res5 = await find.call(fakeSelf, 33, '$lte');
  //   expect(res5).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631'],
  //     keys: [17, 33]
  //   })
  // });
  //
  // it('should find using greater than operators', async function () {
  //   const res = await find.call(fakeSelf, 1, '$gt');
  //   expect(res).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
  //     keys: [17, 33, 45]
  //   })
  //   const res2 = await find.call(fakeSelf, 100, '$gt');
  //   expect(res2).to.be.deep.equal({identifiers: [], keys: []})
  //   const res3 = await find.call(fakeSelf, 16, '$gt');
  //   expect(res3).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
  //     keys: [17, 33, 45]
  //   })
  //   const res4 = await find.call(fakeSelf, 17, '$gt');
  //   expect(res4).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
  //     keys: [33, 45]
  //   })
  //   const res5 = await find.call(fakeSelf, 32, '$gt');
  //   expect(res5).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
  //     keys: [33, 45]
  //   })
  //   const res6 = await find.call(fakeSelf, 33, '$gt');
  //   expect(res6).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482641'],
  //     keys: [45]
  //   })
  //   const res7 = await find.call(fakeSelf, 44, '$gt');
  //   expect(res7).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482641'],
  //     keys: [45]
  //   })
  //   const res8 = await find.call(fakeSelf, 45, '$gt');
  //   expect(res8).to.be.deep.equal({identifiers: [], keys: []})
  // });
  //
  // it('should find using greater than or equal operators', async function () {
  //   const res = await find.call(fakeSelf, 1, '$gte');
  //   expect(res).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
  //     keys: [17, 33, 45]
  //   })
  //   const res2 = await find.call(fakeSelf, 100, '$gte');
  //   expect(res2).to.be.deep.equal({identifiers: [], keys: []})
  //   const res3 = await find.call(fakeSelf, 16, '$gte');
  //   expect(res3).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
  //     keys: [17, 33, 45]
  //   })
  //   const res4 = await find.call(fakeSelf, 17, '$gte');
  //   expect(res4).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
  //     keys: [17, 33, 45]
  //   })
  //   const res5 = await find.call(fakeSelf, 32, '$gte');
  //   expect(res5).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
  //     keys: [33, 45]
  //   })
  //   const res6 = await find.call(fakeSelf, 33, '$gte');
  //   expect(res6).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
  //     keys: [33, 45]
  //   })
  //   const res7 = await find.call(fakeSelf, 44, '$gte');
  //   expect(res7).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482641'],
  //     keys: [45]
  //   })
  //   const res8 = await find.call(fakeSelf, 45, '$gte');
  //   expect(res8).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482641'],
  //     keys: [45]
  //   })
  //   const res9 = await find.call(fakeSelf, 46, '$gte');
  //   expect(res9).to.be.deep.equal({identifiers: [], keys: []})
  // });
  //
  // it('should find using $in operator', async function () {
  //   const res = await find.call(fakeSelf, [17], '$in');
  //   expect(res).to.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482621'],
  //     keys: [17]
  //   })
  //   const res2 = await find.call(fakeSelf, [33], '$in');
  //   expect(res2).to.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482631'],
  //     keys: [33]
  //   })
  //
  //   const res3 = await find.call(fakeSelf, [45], '$in');
  //   expect(res3).to.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482641'],
  //     keys: [45]
  //   })
  //
  //   const res4 = await find.call(fakeSelf, [17, 33, 45], '$in');
  //   expect(res4).to.be.deep.equal({
  //     identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
  //     keys: [17, 33, 45]
  //   })
  //
  //   const res5 = await find.call(fakeSelf, [-3, 0, 14, 18, 32, 34, 44, 46, 100], '$in');
  //   expect(res5).to.be.deep.equal({identifiers: [], keys: []});
  // });
  it('should find using $nin operator', async function () {
    const res = await find.call(fakeSelf, [17], '$nin');
    expect(res).to.deep.equal({
      identifiers: ['5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
      keys: [33, 45]
    })
    const res2 = await find.call(fakeSelf, [33], '$nin');
    expect(res2).to.deep.equal({
      identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482641'],
      keys: [17, 45]
    })

    const res3 = await find.call(fakeSelf, [45], '$nin');
    expect(res3).to.deep.equal({
      identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631'],
      keys: [17, 33]
    })

    const res4 = await find.call(fakeSelf, [17, 33, 45], '$nin');
    expect(res4).to.be.deep.equal({identifiers: [], keys: []})

    const res5 = await find.call(fakeSelf, [-3, 0, 14, 18, 32, 34, 44, 46, 100], '$nin');
    expect(res5).to.be.deep.equal({
      identifiers: ['5d6ebb7e21f1df6ff7482621', '5d6ebb7e21f1df6ff7482631', '5d6ebb7e21f1df6ff7482641'],
      keys: [17, 33, 45]
    });
  });
  // it('should detect nested object', async function () {
  //   //TODO
  //   // const res3 = await query.call(fakeSelf, {address: {country:{$in:['France', 'Russia']}}});
  //
  // });
});
