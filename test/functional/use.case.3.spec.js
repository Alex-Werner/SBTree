const {expect} = require('chai');
const {SBTree} = require('../..');
const users = require('./users');

const toNames = (arr)=>{
  return arr.reduce((acc, el)=>{
      acc.push(el.name);
      return acc
    },[]);
}
describe('E2E - Classic UseCase', function suite() {
  describe('RegUser DB', async () => {
    const customTree = new SBTree({order:3});
    const devan = {
      "name": "Devan",
      "age": 38,
      "gender": "Male",
      "country": "Georgia",
      "_id": "5d6ebb7e21f1df6ff7482631"
    };
    const lilith = {
      "name": "Lilith",
      "age": 25,
      "gender": "Female",
      "country": "Armenia",
    };
    let insertedDocId;
    it('should insert', async function () {
      await customTree.insertDocuments(devan);
      // Inserting any document without a _id will generate it one
      const insertedDoc = await customTree.insertDocuments(lilith);
      insertedDocId = insertedDoc._id;
      console.log("Inserted doc ", insertedDocId)

      // Inserting in bulk is also possible.
      await customTree.insertDocuments([
        users.Anastasia,
        users.Alice,
        users.Alex,
        users.Bob,
        users.Chen,
        users.Jean,
        users.Julian,
        users.Lucy,
        users.Pascal,
        users.Taneti,
        users.Brigitte
      ])
    });

    it('should be able to search bob', async function () {
      const bob = await customTree.findDocuments({name:'Bob'});
      expect(bob).to.deep.equal([users.Bob]);
    });
    it('should be able to search gte 45', async function () {
      const res = await customTree.findDocuments({age: {$gte: 45}})
      const res2 = await customTree.findDocuments({age: {$gt: 44}})
      const expectedRes = [users.Bob];
      expect(res).to.deep.equal(expectedRes);
      expect(res2).to.deep.equal(expectedRes);
      const res3 = await customTree.findDocuments({age: {$gt: 45}})
      expect(res3).to.deep.equal([])
    });
    it('should be able to search lt 45', async function () {
      const res = await customTree.findDocuments({age: {$lt: 45}})
      const res2 = await customTree.findDocuments({age: {$lte: 45}})
      const res3 = await customTree.findDocuments({age: {$lt: 18}})
      const expectedFirstname = ["Julian","Lucy","Lilith","Alex","Jean","Anastasia","Alice","Devan","Brigitte","Chen","Pascal","Teneti"];
      expect(toNames(res)).to.deep.equal(expectedFirstname);
      expect(toNames(res2)).to.deep.equal(expectedFirstname.concat('Bob'));
      expect(res3).to.deep.equal([])

    });
    it('should be able to do query with id', async function () {
      const res = (await customTree.findDocuments({_id:insertedDocId}));
      expect(res).to.deep.equal([Object.assign({_id:insertedDocId}, lilith)])
    });
    it('should be able to do special query',async function () {
      const r = await customTree.findDocuments({country:"France"})
      const i = await customTree.findDocuments({country:{$in:['France']}});
      expect(r).to.deep.equal(i);
      expect(toNames(r)).to.deep.equal(['Brigitte','Alex','Jean'])
      //
      const a =  await customTree.findDocuments({ age:{ $gte:18, $lte:20}});
      expect(toNames(a)).to.deep.equal(['Julian'])
      //
      const a2 = await customTree.findDocuments({ age:{ $gte:38, $lte:39}});
      expect(toNames(a2)).to.deep.equal([ 'Devan', 'Brigitte', 'Chen']);
      //
      const res = (await customTree.findDocuments({country: {$in: ['France']}, age:{ $gte:18, $lte:39}, gender:"Female"}));
      expect(toNames(res)).to.deep.equal(['Brigitte']);
    });
    it('should be able to get doc by id',async function () {
      const res = (await customTree.getDocument(insertedDocId))
      expect(res).to.deep.equal(Object.assign({_id:insertedDocId}, lilith))
    });
    it('should be able to remove a document',async function () {
      const res = (await customTree.deleteDocuments({name:'Bob'}))
      expect(res).to.deep.equal([users.Bob])
      const search = await customTree.findDocuments({name:'Bob'});
      expect(search).to.deep.equal([]);
    });
  });
})
