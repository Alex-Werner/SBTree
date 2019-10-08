const {forEach} = require('./array');

/*
 Cheap drawing implementation. Would need deep rework to make it really working.
 */
const draw = async (fieldNode, preventConsole = false) => {
  if (fieldNode.id[0] === 't') {
    !preventConsole && console.log(`======== SBTree Tree ========`);
    !preventConsole && console.log(`=== Id : ${fieldNode.id}`)
    !preventConsole && console.log(`=== Order :  ${fieldNode.order}`)
    if (Object.keys(fieldNode.fieldTrees).length === 0) {
      !preventConsole && console.log(`=== Empty.`)
      return [];
    } else {
      let res = [];
      await forEach(Object.keys(fieldNode.fieldTrees), async (fieldKey) => {
        const fieldTree = fieldNode.fieldTrees[fieldKey]
        res = res.concat(await draw(fieldTree, preventConsole));
      })
      return res;
    }
  }

  !preventConsole && console.log(`======== SBTree Node ========`);
  !preventConsole && console.log(`=== Id : ${fieldNode.id}`)
  !preventConsole && console.log(`=== Order :  ${fieldNode.order}`)
  !preventConsole && console.log(`=== Field :  ${fieldNode.fieldName}`)

  const {root} = fieldNode;
  const rows = [];


  const processChildrenToRows = async (_childrens) => {
    let childToProcess = [];
    const childrens = [];
    await forEach(_childrens, async (child) => {
      if (child.type === 'leaf') {
        childrens.push((await child.getAll()).keys);
      } else if (child.type === 'node') {

        childrens.push(child.keys);
        childToProcess = childToProcess.concat(child.childrens);
      } else {
        throw new Error(`Received invalid type ${child.type}`);
      }
    });

    rows.push(childrens);
    return childToProcess;
  }

  const processRootChildrens = async (_childrens) => {
    return await processChildrenToRows(_childrens);
  }
  const processLeafs = async (_leafs) => {
    const toProcessChildren = await processChildrenToRows(_leafs);
    if (toProcessChildren.length > 0) {
      await processLeafs(toProcessChildren);
    }
  }
  const processFromRoot = async (_root) => {
    rows.push(_root.keys);
    if(_root.childrens.length>0){
      const childrensToProcess = await processRootChildrens(_root.childrens)

      if (childrensToProcess.length) {
        await processLeafs(childrensToProcess);
      }
    }
  }

  await processFromRoot(root);


  const spanVal = 2;
  const biggestChildLen = rows[rows.length - 1].length;
  const biggestRepeatTimes = biggestChildLen * spanVal;

  rows.forEach((row, i) => {
    // const next = rows[i+1] || [];
    const calc = biggestRepeatTimes - (i * spanVal * 2)
    const repeatTimes = (calc > 0) ? calc : 0;
    !preventConsole && console.log(`${' '.repeat(repeatTimes)}${JSON.stringify(row)}`);
  })
  return rows;
};
module.exports = {draw};
