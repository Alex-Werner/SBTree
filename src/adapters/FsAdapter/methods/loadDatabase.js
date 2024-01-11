import each from 'lodash.foreach';
import LeafMeta from "../types/LeafMeta/LeafMeta.js";
export default async function loadDatabase() {
  const job = await this.queue.add('File.read', `${this.path}/sbtree.meta`);
  await job.execution();
  const db = job.result;
  if (db) {
    const {
      leafs,
      tree,
    } = db;

    if (tree) {
      each(leafs, (leaf, leafName) => {
        this.leafs[leafName] = { name: leafName, meta: new LeafMeta(leaf.meta) };
      });

      await this.getParent().loadState(tree);
    }
  }

  this.isReady = true;
};
