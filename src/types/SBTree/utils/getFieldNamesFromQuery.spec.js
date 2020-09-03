const { expect } = require('chai');

const getFieldNamesFromQuery = require('./getFieldNamesFromQuery');

describe('utils - .getFieldNamesFromQuery', ()=>{
  it('should works', ()=>{
    const res = getFieldNamesFromQuery({age:33});
    expect(res).to.deep.equal(['age']);

    const res2 = getFieldNamesFromQuery({infos:{age:33}});
    expect(res2).to.deep.equal(['infos.age']);

    const res3 = getFieldNamesFromQuery({infos:{job:{sector:"IT"}}});
    expect(res3).to.deep.equal(['infos.job.sector']);

    const res4 = getFieldNamesFromQuery({age:23,infos:{job:{sector:"IT"}}});
    expect(res4).to.deep.equal(['age','infos.job.sector']);

    const res5 = getFieldNamesFromQuery({ age: { '$gte': 33, '$lte': 50 } });
    expect(res5).to.deep.equal(['age']);
  })
})
