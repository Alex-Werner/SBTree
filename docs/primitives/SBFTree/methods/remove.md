#### async tree.remove(identifier)

Will remove a document from an identifier. 
The RemoveCommand instance holds the different fields to delete the identifiers from.

```js
    const removeCommand = new RemoveCommand()
    await tree.remove(removeCommand);
```

