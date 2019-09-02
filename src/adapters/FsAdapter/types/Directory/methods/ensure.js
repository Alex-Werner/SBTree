module.exports = async function ensure(p) {
  console.log('1');
  const exist = await this.exists(p);
  console.log('2');

  if(!exist){
    console.log('3');

    await this.create(p);
    console.log('4');

    return this.ensure(p);
  }
  return exist;
}
