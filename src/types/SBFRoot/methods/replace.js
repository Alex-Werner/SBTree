async function replace(identifier, value) {
  const { childrens } = this;
  if (childrens.length === 0) {
    const currIndex = this.identifiers.indexOf(identifier);
    this.keys[currIndex] = value;
  } else {
    let leafIndex = 0;
    this.keys.forEach((_key) => {
      if (value <= _key) return;
      leafIndex++;
    });
    const leaf = childrens[leafIndex];
    await leaf.replace(identifier, value);
  }

  if (this.isFull()) {
    await this.split();
  }
}
module.exports = replace;
