const {SBFTree} = require('../src');

const tree = new SBFTree({field:'users',order:3, verbose:true});
const start = async function (){
  await tree.insert(5, '5bf');
  await tree.insert(3, '3ae');
  await tree.insert(6, '2yc');
  await tree.insert(7, '7zx');
  await tree.insert(2, '2ti');
  await tree.insert(1, '1fect');
  await tree.insert(8, '8fect');
  await tree.insert(9, '9vi');
  await tree.insert(10, '10vi');
  await tree.insert(4, '4das');
  await tree.insert(11, '11ver');
  await tree.insert(12, '12fin');
  await tree.insert(13, '13conf');
  await tree.insert(14, '14r');
  await tree.insert(15, '15gbye');

  console.dir(tree.root);
}
start();
