module.exports = async function ensure(p) {
  const exist = await this.exists(p);

  if(!exist){

    await this.create(p);

    return this.ensure(p);
  }
  return exist;
}
