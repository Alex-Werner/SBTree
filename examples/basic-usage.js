const {SBTree} = require('../index');

const tree = new SBTree();
const start = async function () {

  await tree.insertDocuments({age: 27, email: 'alex@valjean.fr', _id: '16ced004da93e'});
  await tree.insertDocuments([
    {age: 33, email: 'alain@dourak.ru', _id: '16ced00ee7931'},
    {age: 33, email: 'basil@valjean.fr', _id: '16ced00ce6a31'},
  ])
  // If you don't have any _id attach, it will create one for you
  await tree.insertDocuments({age: 42, email: 'jean@valjean.fr'});

  console.dir(tree);
}



start();
