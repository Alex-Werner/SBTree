module.exports = async function findAll(){
  let result = [];

  let p = [];
  this.childrens.forEach((child)=>{
    p.push(child.findAll());
  });

  await (Promise.all(p)).forEach((p)=>{
    result = result.concat(p);
  });

  return result;
}
