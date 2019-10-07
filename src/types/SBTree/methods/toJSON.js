function toJSON() {
  const {
    order,
    fillFactor,
    verbose,
    id,
    fieldTrees,
    uniques,
    excludes,
    size,
    adapter
  } = this;

  return JSON.parse(JSON.stringify({
    order,
    fillFactor,
    verbose,
    id,
    fieldTrees,
    uniques,
    excludes,
    size,
    adapter
  }));
};
module.exports = toJSON;
