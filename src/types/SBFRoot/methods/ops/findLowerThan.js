const {difference} = require('lodash');
async function findLowerThan(key, includeKey=false){
  let result = [];

  // We first see where our key is located;
  let leafIndex = 0;

  this.keys.forEach((_key)=>{
    if(key<=_key) return;
    leafIndex++;
  });

  let p = [];

  // All smaller leaf that our leafIndex needs to be included
  if(leafIndex>=1){
    this.childrens.slice(0, leafIndex).forEach((child)=>{
      p.push(child.findAll());
    });


  }

  // Finally, we lookup for all lower than matches in the actual leaf where we had our el.
  p.push(this.childrens[leafIndex].findLowerThan(key, includeKey));

  if(this.keys.includes(key)){
    p.push(await this.childrens[leafIndex+1].findLowerThan(key, includeKey));
  }

  await Promise.all(p).then((res)=>{
    res.forEach((p)=>{
      result = result.concat(p);
    })
  });

  return result;
};
module.exports = findLowerThan;
