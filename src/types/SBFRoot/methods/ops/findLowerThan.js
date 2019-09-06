const {difference} = require('lodash');
async function findLowerThan(key, includeKey=false){
  let result = [];

  // We first see where our key is located;
  let leafIndex = 0;

  this.keys.forEach((_key)=>{
    if(key<=_key) return;
    leafIndex++;
  });
  // All smaller leaf that our leafIndex needs to be included
  if(leafIndex>=1){

    let p = [];

    this.childrens.slice(0, leafIndex).forEach((child)=>{
      p.push(child.findAll());
    });

    await Promise.all(p).then((res)=>{
      res.forEach((p)=>{
        result = result.concat(p);

      })
    });
  }

  // Finally, we lookup for all lower than matches in the actual leaf where we had our el.
  result = result.concat(await this.childrens[leafIndex].findLowerThan(key, includeKey));

  if(this.keys.includes(key)){
    result = result.concat(await this.childrens[leafIndex+1].findLowerThan(key, includeKey));
  }
  return result;
};
module.exports = findLowerThan;
