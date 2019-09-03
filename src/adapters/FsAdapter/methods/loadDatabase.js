const LeafData = require('../types/LeafData/LeafData')
const LeafMeta = require('../types/LeafMeta/LeafMeta')
const {each} = require('lodash');
module.exports = async function loadDatabase(){
    const job = await this.queue.add('File.read', `${this.options.path}/sbtree.meta`);
    await job.execution();
    const db = job.results;
    const {
        leafs,
        tree
    } = db;

    if(tree){
        each(leafs,(leaf, leafName)=>{
            this.leafs[leafName] = {name:leafName, meta:new LeafMeta(leaf.meta)};
        })
        await this.parent.loadState(tree);

    }

    // console.dir(this.parent, {depth:null});
    // throw new Error();

    // console.log(this);/**/
    // console.log(this.parent)


    // console.log(this.parent);
    // const {size, options}=this;
    // const fieldTrees = {};
    // each(this.fieldTrees,(fieldTree, name)=>{
    //     fieldTrees[name] = [fieldTree.field,fieldTree.root]
    // })
    //
    // console.log(fieldTrees);
    //
    // return JSON.parse(JSON.stringify({size, options, fieldTrees}));
    //
    // console.log(this);

    // throw new Error('')

    // each(leafs,(leaf, leafName)=>{
    //   this.leafs[leafName] = new LeafMeta(leaf.meta);
    // })

}
