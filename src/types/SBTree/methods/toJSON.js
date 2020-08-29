function toJSON() {
  const {
    order,
    fillFactor,
    verbose,
    id,
    fieldTrees,
    uniques,
    exclude,
    size,
    adapter,
  } = this;

  return JSON.parse(JSON.stringify({
    order,
    fillFactor,
    verbose,
    id,
    fieldTrees,
    uniques,
    exclude,
    size,
    adapter,
  }));
}
module.exports = toJSON;
