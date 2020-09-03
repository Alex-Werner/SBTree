### SBFTree API 

```js
const fielTree = new SBFTree([props]);
```
- Constructor options :
  - `adapter` Adapter - (def: MemoryAdapter) : Allow to specific another adapter to use
  - `order` Number - (def: 511) : Primordial for the performance, the closest to L1 the better. Chose below 2^n. 
  - `fillFactor` Float - (def: 0.5) : Used for balancing the tree. Should not be less than 0.5 (50%). 
  - `verbose` Bool - (def: false)
  - `isUnique` Bool - (def: false)
  - `root` SBFRoot - (def: null) - Allow to set a root to the fieldTree.
  - `exclude` Array - (def: []) - Allow to exclude from indexing some field (important if you expect field value to be huge or nested).
  - `id` FieldId - Allow to identify a FieldTree by an id; useful especially for adapter.

### Usage

The SBFTree is an interface instance specific to a field. For a document {age, name}, you would have two SBFTree, one for age, one for name. 

The Tree has two components, an identifier (of the document), and a value and use a B+Tree.


### Methods 

- [find](primitives/SBFTree/methods/find)
- [get](primitives/SBFTree/methods/get)
- [insert](primitives/SBFTree/methods/insert)
- [remove](primitives/SBFTree/methods/remove)
- [replace](primitives/SBFTree/methods/replace)
