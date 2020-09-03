### SBTree 

```js
const tree = new SBTree([props]);
```

- Constructor options :
  - `adapter` Adapter - (def: MemoryAdapter) : Allow to specific another adapter to use
  - `order` Number - (def: 511) : Primordial for the performance, the closest to L1 the better. Chose below 2^n. 
  - `fillFactor` Float - (def: 0.5) : Used for balancing the tree. Should not be less than 0.5 (50%). 
  - `verbose` Bool - (def: false)
  - `uniques` Array - (def: []) - Allow to set some field unique by adding them to this array
  - `exclude` Array - (def: []) - Allow to exclude from indexing some field (important if you expect field value to be huge or nested).

### Usage

The SBTree is the instance that will allow you to insert, get, find, replace or delete documents.
It internally hold multiple instances of [SBFTree](primitives/SBFTree.md) and works as a router, interfacing with the users.

### Methods 

- [deleteDocuments](primitives/SBTree/methods/deleteDocuments)
- [findDocuments](primitives/SBTree/methods/findDocuments)
- [getDocument](primitives/SBTree/methods/getDocument)
- [insertDocuments](primitives/SBTree/methods/insertDocuments)
- [toJSON](primitives/SBTree/methods/toJSON)
