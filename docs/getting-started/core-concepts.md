## Core Concepts

SBTree allows you to insert, delete, update, replace and find withing a balance B+ tree supporting uniqueness, and optional fields.

SBTree holds set of SBFTree (F stands for Field).   

On each insertion of a document, we parse all individual field, if we did not yet have a SBFTree with this fieldName, we creates. 

All further instruction (finding, inserting,...) are directed to this tree manager.

## SBFTree

A SBFTree is unique for each fields, for nested object, each field of this object also have their own SBFTree.

Using B+Tree, we have a root, that lead to leaf, or intermediaries node (holding leafs) and we manage indexing this way. 

In those nodes (SBFRoot, SBFLeaf, SBFNode), we hold childrens reference (half splitting), set of keys (in a SBFTree of names, that would be ["Jean Valjean",...]) and identifiers (_id of the document).

The logic is then that we parse query into those fieldTrees to output identifiers, and we resolves those identifiers by looking for a get of those document by Id.

## Adapters

This system allows to have a indices db locally, that support a MongoDB style command (but without any thing to install). 

Due to the fact that it request persistance on a key-value way (via document id), it can be adaptable to a range of usage (local memory with single file save persistance, fs-adapter with single file / id, localstorage, mongodb,...);
