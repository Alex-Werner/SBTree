## SBTree

[![NPM Version](https://img.shields.io/npm/v/sbtree.svg?&style=flat-square)](https://www.npmjs.org/package/sbtree)
[![Build Status](https://img.shields.io/github/workflow/status/alex-werner/sbtree/Node.js%20CI)](https://github.com/Alex-Werner/SBTree/actions)
[![Release Date](https://img.shields.io/github/release-date/alex-werner/sbtree)](https://github.com/alex-werner/sbtree/releases/latest)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen)](https://github.com/RichardLitt/standard-readme)

> Fast document store using B+ Tree for fields. Adapters support for In-Memory and FileSystem 

---

SBTree is intended to provide a  way to quickly store document-based data in-memory or on the filesystem.  
It uses a field-specific indexing system relaying on B+Tree structure.  
This allow to handle a lot of data, and have them indexed without the need to keep the whole dataset in-memory. 
Most of the databases uses B-Tree (MongoDB, CouchDB) or B+Tree (InnoDB, MariaDB, MySQL).

Note : By default. Everything except specifically excluded field are indexed.  
Nested object are also indexed.    
Optional support for uniques key provided.    

## Install

## Browser 

```html
<script src="https://unpkg.com/sbtree"></script>
```

## Node

In order to use this library, you will need to add our [NPM package](https://www.npmjs.com/dash) to your project.

Having [NodeJS](https://nodejs.org/) installed, just type :

```bash
npm install sbtree
```

## Usage


```js
const { SBTree } = require("sbtree");
const tree = new SBTree({order:100});
const start = async function () {
  const doc = {_id:'507f1f77bcf86cd799439011',name:"Alex", age:28};
  const doc2 = {name:"Jean", age:30}
  await tree.insertDocuments(doc);
  await tree.insertDocuments(doc2);

  // [ { _id: '507f1f77bcf86cd799439011', name: 'Alex', age: 28 } ]
  const searchLte = await tree.findDocuments({age:{$lte:28}});
  // [ { _id: '507f1f77bcf86cd799439011', name: 'Alex', age: 28 } ] -> equivalent {age:{$eq:28}}
  const searchEq = await tree.findDocuments({age:28});

  // [ { _id: '507f1f77bcf86cd799439011', name: 'Alex', age: 28 } ]
  const [alex] = await tree.getDocument(doc._id);
  
  // [ { _id: '...', name: 'Jean', age: 30 } ]
  const deleteRes = await tree.deleteDocuments({age:30});

  alex.age = 29;
  const replaceRes = await tree.replaceDocuments(alex)

  await tree.insertDocuments({name:'John', nestedField:{isNested:{itIs:true}}});
  const [john] = await tree.findDocuments({nestedField:{isNested:{itIs:true}}});

}
tree.on('ready', start);

const tree = new SBTree({
  network: "testnet",
  mnemonic: "arena light cheap control apple buffalo indicate rare motor valid accident isolate",
});

client.isReady().then(async () => {
  const {account, platform} = client;
  console.log("Funding address", account.getUnusedAddress().address);
  console.log("Confirmed Balance", account.getConfirmedBalance());
  console.log(await platform.names.get('alice'));
});

```

## Adapters 

- `MemoryAdapter` : Default adapter. Set Store inMemory. Limited by heap memory available (good enough).
- `FsAdapter` : Set Data in filesystem. Limitation should be disksize on optimized order.


## Licence

[MIT](https://github.com/Alex-Werner/SBTree/blob/master/LICENCE.md) © Alex Werner

