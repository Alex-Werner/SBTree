const { expect } = require('chai');

const findDocuments = require('./findDocuments');
const mock = {
  state:{
    isReady: true
  }
}
describe('.findDocuments()', ()=>{
  it('should find documents', function () {

  });
  it('should return null on non found documents', async function () {
    const response = await findDocuments.apply(mock, {age: 13});
    expect(response).to.deep.equal([]);
  });
});
