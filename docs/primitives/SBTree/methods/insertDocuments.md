#### async tree.insertDocuments(documents)

Allow to process an array (or unique) of documents and get them inserted. 
It returns the inserted array containing mutated (with their _id if not specified in document) values.

```js
    await tree.insertDocuments({age:33, name:"Jean",_id:'507f191e810c19729de860ea'})
```

