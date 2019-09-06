async function findAll(){
  let result = [];

  let p = [];
  this.childrens.forEach((child)=>{
    p.push(child.findAll());
  });

  await Promise.all(p).then((res)=>{
    res.forEach((resolvedP)=>{
      result = result.concat(resolvedP);
    });
  });

  return result;
}
module.exports = findAll;
