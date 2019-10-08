module.exports = async function getAll(){
  let result = [];

  let p = [];
  this.childrens.forEach((child)=>{
    p.push(child.getAll());
  });

  await Promise.all(p).then((res) => {
    res.forEach((p) => {
      result = result.concat(p);
    })
  });

  return result;
}
