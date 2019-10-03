const {forEach}=require('./array');

/*
 Cheap drawing implementation. Would need deep rework to make it really working.
 */
const draw = async (fieldNode)=>{
console.log(`======== SBTree Node ========`);
console.log(`=== Id : ${fieldNode.id}`)
console.log(`=== Order :  ${fieldNode.options.order}`)
console.log(`=== Field :  ${fieldNode.fieldName}`)

const { root } = fieldNode;
const rows = [];


const processChildrenToRows = async (_childrens) =>{
  let childToProcess = [];
  const childrens = [];
  await forEach(_childrens,async (child)=>{
    if(child.type === 'leaf'){
      childrens.push((await child.getAll()).keys);
    }else if (child.type === 'node'){
      childrens.push(child.keys);
      childToProcess = childToProcess.concat(child.childrens);
    }else{
      throw new Error(`Received invalid type ${child.type}`);
    }
  });
  rows.push(childrens);
  return childToProcess;
}

const processRootChildrens = async (_childrens)=>{
  return await processChildrenToRows(_childrens);
}
const processLeafs = async (_leafs)=>{
  const toProcessChildren = await processChildrenToRows(_leafs);
  if(toProcessChildren.length>0){
    await processLeafs(toProcessChildren);
  }
}
const processFromRoot = async (_root) =>{
  rows.push(_root.keys);
  const childrensToProcess = await processRootChildrens(_root.childrens)

  console.log(childrensToProcess)
  if(childrensToProcess.length){
    await processLeafs(childrensToProcess);
  }
}

await processFromRoot(root);



const spanVal = 2;
const biggestChildLen = rows[rows.length-1].length;
const biggestRepeatTimes = biggestChildLen * spanVal;

rows.forEach((row,i)=>{
  // const next = rows[i+1] || [];
  const repeatTimes = biggestRepeatTimes - (i*spanVal*2);
  console.log(`${' '.repeat(repeatTimes)}${JSON.stringify(row)}`);
})
};
module.exports = {draw};