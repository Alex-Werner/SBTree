module.exports = async function getAll(){
  let result = {identifiers:[], keys:[]};


  let p = [];
  this.childrens.forEach((child) => {
    p.push(child.getAll());
  });

  return new Promise((resolve) => {
    Promise
        .all(p)
        .then((res) => {
          res.forEach((resolvedP) => {
            if(resolvedP.identifiers){
              result.identifiers.push(...resolvedP.identifiers);
              result.keys.push(...resolvedP.keys);
            }else if(Array.isArray(resolvedP)){
              resolvedP.forEach((item) => {
                result.identifiers.push(...item.identifiers);
                result.keys.push(...item.keys);
              });
            }else{
              throw new Error(`Unexpected type of resolvedP - type : ${typeof resolvedP}`)
            }
          });
          resolve(result);
        });
  })

  return result;
}
