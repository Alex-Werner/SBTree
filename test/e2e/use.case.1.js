const {expect} = require('chai');
const {SBTree} = require('../..');
const userList = require('../fixtures/use.cases/1.reg.users').users;
const {draw}= require('../../src/utils/ascii');
describe('E2E - Classic UseCase', function suite() {
  describe('RegUser DB', () => {
    const shiftedUsers = [];
    const tree = new SBTree();
    const customTree = new SBTree({
      order: 3,
    });
    it('should init with correct default', function () {
      expect(tree.options).to.deep.equal({
        order: 511,
        fillFactor: 0.5,
        verbose: false
      });
      expect(tree.adapter.constructor.name).to.equal('MemoryAdapter');
      expect(tree.size).to.equal(0);
      expect(tree.exclude).to.deep.equal([]);
      expect(tree.uniques).to.deep.equal([]);
      expect(tree.fieldTrees).to.deep.equal({});
    });
    it('should init with crafted options', function () {
      expect(customTree.options).to.deep.equal({
        order: 3,
        fillFactor: 0.5,
        verbose: false
      });
      expect(customTree.adapter.constructor.name).to.equal('MemoryAdapter');
      expect(customTree.size).to.equal(0);
      expect(customTree.exclude).to.deep.equal([]);
      expect(customTree.uniques).to.deep.equal([]);
      expect(customTree.fieldTrees).to.deep.equal({});
    });
    it('should allow to insert documents', async function () {
      const doc = userList.shift();
      shiftedUsers.push(doc);

      await customTree.insertDocuments(doc);

    });
    it('should correctly create fieldTrees', async function () {
      expect(customTree.size).to.equal(1);
      expect(customTree.id[0]).to.equal('t');

      const fieldTrees = Object.keys(customTree.fieldTrees);
      const expectedFieldTrees = ['age', 'firstname', 'lastname', 'email'];
      expect(fieldTrees).to.deep.equal(expectedFieldTrees);
      fieldTrees.forEach((fieldTreeName) => {
        const fieldTree = customTree.fieldTrees[fieldTreeName];
        expect(fieldTree.id[0]).to.equal('f');
        expect(fieldTree.options.order).to.equal(3);
        expect(fieldTree.root.id[0]).to.equal('r');

        const root = fieldTree.root;
        const rootFirstChildren = root.childrens[0];
        expect(rootFirstChildren.id[0]).to.equal('l');
        expect(rootFirstChildren.fieldName).to.equal(root.fieldName);
        expect(rootFirstChildren.type).to.equal('leaf');
      })
    });
    it('should allow to find document', async function () {
      const doc = shiftedUsers[0];
      const findRes = await customTree.findDocuments({age: doc.age});
      expect(findRes).to.deep.equal([doc])
    });
    it('should allow more than order', async function () {
      const doc2 = userList.shift();
      const doc3 = userList.shift();
      shiftedUsers.push(doc2);
      shiftedUsers.push(doc3);
      await customTree.insertDocuments(doc2);

      await customTree.insertDocuments(doc3);

      expect(customTree.fieldTrees['age'].root.keys).to.deep.equal([30]);
      expect(customTree.fieldTrees['age'].root.childrens.length).to.deep.equal(2);
      expect(await customTree.fieldTrees['age'].root.childrens[0].getAll()).to.deep.equal({
        identifiers: ['5d73d1e14f24b21368a42631'],
        keys: [24]
      });
      expect(await customTree.fieldTrees['age'].root.childrens[1].getAll()).to.deep.equal({
        identifiers: ['5d73d1e14f24b21368185bb6', '5d73d1e14f24b213686f48a6'
        ],
        keys: [30, 31]
      });
    });
    it('should still allow to find document', async function () {
      const doc = shiftedUsers[0];
      const findRes = await customTree.findDocuments({age: doc.age});
      expect(findRes).to.deep.equal([doc])
    });
    it('should allow to remove document', async function () {
      // const doc = shiftedUsers[0];
      // const delRes = await customTree.deleteDocuments({email: doc.email});
      // console.log(delRes)
      // expect(delRes).to.deep.equal([doc])
    });
    it('should allow to add even more', async function () {
      const doc4 = userList.shift();
      const doc5 = userList.shift();
      const doc6 = userList.shift();
      const doc7 = userList.shift();
      shiftedUsers.push(doc4);
      shiftedUsers.push(doc5);
      shiftedUsers.push(doc6);
      shiftedUsers.push(doc7);
      await customTree.insertDocuments(doc4);
      await customTree.insertDocuments(doc5);
      await customTree.insertDocuments(doc6);
      await customTree.insertDocuments(doc7);

    });
    it('should allow to remove document', async function () {
      const doc = shiftedUsers[0];
      await draw(customTree);
      const delRes = await customTree.deleteDocuments({email: doc.email});
      await draw(customTree);

      // console.log(delRes)
      // expect(delRes).to.deep.equal([doc])
    });
  });

})
