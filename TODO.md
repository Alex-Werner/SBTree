## TODO 

- [ ] Remove a key.
- [ ] Query comparators (See all the fun planned in queries)
- [ ] Count - Should be faster than get as we do not need to even fetch the data itselves.
- [ ] Sequential identifier parsing or easy way to output (for $ne) all identifiers.
- [ ] Allow limit. Limit should break any loop and answer as soon as possible.
- [ ] Allow to excludes certains indexes or switch from all indexed to a specify index only ?
- [ ] Allow to set some indexes uniques.
- [ ] Do we want to allow them to allow duplicate _id ?
- [ ] Case sentitivity (the transform method need to be deterministic. It won't touch the value added in documents.);
- [ ] LRU Caching on the most requested keys
