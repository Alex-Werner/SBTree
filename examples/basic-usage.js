const {SBTree} = require('../index');

const tree = new SBTree({order: 3});

const {Timer} = require('../src/utils/time');
const timer = new Timer();

const start = async function () {
  timer.start();
  await tree.insertDocuments({age:43, country:'United States', email:'bob@valjean.fr', _id:'5d6dc94e3c7734812f051d7b'});
  await tree.insertDocuments({age:21, country:'Russia',email:'julia@valjean.fr', _id:'5d6dc94e3c7734812f051d7c'});
  await tree.insertDocuments({age:22, country:'United Kingdom',email:'zack@valjean.fr', _id:'5d6dc94e3c7734812f051duk'});

  // Duplicate do not get added
  await tree.insertDocuments({age: 43, country:'United States', email: 'bob@valjean.fr', _id: '5d6dc94e3c7734812f051d7b'});

  await tree.insertDocuments({age:29, country:'Belgium', email:'patrick@valjean.fr', _id:'5d6dc94e3c7734812f051bel'});
  await tree.insertDocuments({age:27, country:'France', email:'valentin@valjean.fr', _id:'5d6dc94e3c7734812f051df4'});
  await tree.insertDocuments({age: 33, email: 'goptnik@dourak.ru', country:'Russia', _id: '5d6dc93f6059937716f41eed'},);

  // Bulk insert also works
  await tree.insertDocuments([
    {age: 33, email: 'basil@valjean.fr',country:'France', _id: '5d6dc93a34d1cfc2c45fdc09'},
    {age: 11, email: 'jean@valjean.fr', country:'France',_id: '5d6dc077e27058fb6c7d8592'},
    {age: 18, email: 'luc@valjean.fr', country:'France',_id: '5d6ded39ea07d9b4c062b744'},
    {age: 86, email: 'charles@valjean.fr',country:'France', _id: '5d6ded52666c83c63210d55f'},
    {age:44, email:'phillipe@valjean.fr',country:'France', _id:'5d6ded6fcb8d55944c7fc5e6'}
  ])

  // // If you don't have any _id attach, it will create one for you
  const inserted = await tree.insertDocuments({age: 42, email: 'jean.paul@valjean.fr'});


  // Feature in todo
  // console.log(await tree.deleteDocuments({_id:'5d6dc93f6059937716f41eed'}))


  console.log(await tree.getDocument('5d6dc94e3c7734812f051d7b'))
  console.log(await tree.findDocuments({age:33}))
  console.log(await tree.findDocuments({email:'goptnik@dourak.ru'}))
  console.log(await tree.findDocuments({_id:inserted._id}))
  //
  console.log(await tree.findDocuments({age:{$gte:44}}))
  console.log(await tree.findDocuments({country:{$nin:['France',"Belgium", "Russia"]}}))
  console.log(await tree.findDocuments({country:{$in:['Belgium']}}));

  timer.stop();
  console.log(timer.duration.s, 'seconds');

}


tree.on('ready', start);
