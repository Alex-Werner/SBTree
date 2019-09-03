const {SBTree} = require('../index');
const ObjectID = require('mongo-objectid');
const tree = new SBTree({order: 3});
const start = async function () {

  await tree.insertDocuments({age:43, email:'bob@valjean.fr', _id:'5d6dc94e3c7734812f051d7b'});
  await tree.insertDocuments({age:21, email:'julia@valjean.fr', _id:'5d6dc94e3c7734812f051d7c'});
  await tree.insertDocuments({age:22, email:'zack@valjean.fr', _id:'5d6dc94e3c7734812f051dff'});

  await tree.insertDocuments({age: 43, email: 'bob@valjean.fr', _id: '5d6dc94e3c7734812f051d7b'});
  await tree.insertDocuments({age: 21, email: 'julia@valjean.fr', _id: '5d6dc94e3c7734812f051d7c'});
  await tree.insertDocuments({age:22, email:'zack@valjean.fr', _id:'5d6dc94e3c7734812f051dff'});
  await tree.insertDocuments({age:27, email:'valentin@valjean.fr', _id:'5d6dc94e3c7734812f051df4'});
  await tree.insertDocuments({age:29, email:'patrick@valjean.fr', _id:'5d6dc94e3c7734812f051dff'});


  await tree.insertDocuments([
    {age: 33, email: 'alain@dourak.ru', _id: '5d6dc93f6059937716f41eed'},
    {age: 33, email: 'basil@valjean.fr', _id: '5d6dc93a34d1cfc2c45fdc09'},
    {age: 11, email: 'jean@valjean.fr', _id: '5d6dc077e27058fb6c7d8592'},
    {age: 18, email: 'patrick@valjean.fr', _id: '5d6ded39ea07d9b4c062b744'},
    {age: 86, email: 'charles@valjean.fr', _id: '5d6ded52666c83c63210d55f'},
    {age:44, email:'phillipe@valjean.fr', _id:'5d6ded6fcb8d55944c7fc5e6'}
  ])

  console.log(await tree.deleteDocuments({_id:'5d6dc93f6059937716f41eed'}))

  // // If you don't have any _id attach, it will create one for you
  const id = await tree.insertDocuments({age: 42, email: 'jean@valjean.fr'});
  //
  console.log(await tree.getDocument('5d6dc94e3c7734812f051d7b'))
  console.log(await tree.findDocuments({age:33}))
  console.log(await tree.findDocuments({email:'alain@dourak.ru'}))
  console.log(await tree.findDocuments({_id:id}))
  console.log(await tree.findDocuments({age:32}))
  console.log(await tree.findDocuments({sexe:'male'}))
}


tree.on('ready', start);
