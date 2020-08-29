const {expect} = require('chai');
const {SBTree} = require('../../index');
const fakeData = require('../fixtures/age')
const {Timer} = require('../../src/utils/time');
const {version} = require('../../package.json');
const each = require('lodash.foreach');
const reduce = require('lodash.reduce');

let tree;

const len = 5000;
if(fakeData.length<len) throw new Error('');

let standard = {
  writeOp: {
    maxOp: len,
    executedOp: 0,
    duration: 0,
    ops: 0
  },
  negFindOp: {
    maxOp: 950,
    executedOp: 0,
    duration: 0,
    ops: 0
  },
  gtFindOp: {
    maxOp: 1950,
    executedOp: 0,
    duration: 0,
    ops: 0
  },
  gteFindOp: {
    maxOp: 1900,
    executedOp: 0,
    duration: 0,
    ops: 0
  },
  ltFindOp: {
    maxOp: 1800,
    executedOp: 0,
    duration: 0,
    ops: 0
  },
  lteFindOp: {
    maxOp: 1900,
    executedOp: 0,
    duration: 0,
    ops: 0
  },
  // maxOp cannot be >3* writeOp
  inFindOp: {
    maxOp: Math.floor(len/3),
    executedOp: 0,
    duration: 0,
    ops: 0
  },
  // maxOp cannot be >3* writeOp
  ninFindOp: {
    maxOp: Math.floor(4000/3),
    executedOp: 0,
    duration: 0,
    ops: 0
  }
}
describe('SBTree - Performance - Extended Benchmark within test ', async function () {
  this.timeout(150000)
  before((done) => {
    console.log(`Will process ${fakeData.length} elements`);
    tree = new SBTree({order: 127});
    tree.on('ready', () => {
      done();
    });
  })

  it('should be fast', async function () {

    const writeData = JSON.parse(JSON.stringify(fakeData));
    const negFindData = JSON.parse(JSON.stringify(fakeData));
    const gtFindData = JSON.parse(JSON.stringify(fakeData));
    const ltFindData = JSON.parse(JSON.stringify(fakeData));
    const gteFindData = JSON.parse(JSON.stringify(fakeData));
    const lteFindData = JSON.parse(JSON.stringify(fakeData));
    const inFindData = JSON.parse(JSON.stringify(fakeData));
    const ninFindData = JSON.parse(JSON.stringify(fakeData));

    const jobs = [
      ['writeOp', async () => {
        const document = writeData.splice(~~(Math.random() * (writeData.length - 1 + 1) + 0), 1)[0];
        return tree.insertDocuments(document);
      }],
      ['negFindOp', async () => {
        const rand = ~~(Math.random() * (negFindData.length - 1 + 1) + 0);
        const query = {age: {$ne: negFindData.splice(rand, 1)[0].age}};
        return tree.findDocuments(query)
      }],
      ['gtFindOp', async () => {
        const rand = ~~(Math.random() * (gtFindData.length - 1 + 1) + 0);
        const query = {age: {$gt: gtFindData.splice(rand, 1)[0].age}};
        return tree.findDocuments(query)
      }],
      ['gteFindOp', async () => {
        const rand = ~~(Math.random() * (gteFindData.length - 1 + 1) + 0);
        const query = {age: {$gte: gteFindData.splice(rand, 1)[0].age}};
        return tree.findDocuments(query)
      }],
      ['ltFindOp', async () => {
        const rand = ~~(Math.random() * (ltFindData.length - 1 + 1) + 0);
        const query = {age: {$lt: ltFindData.splice(rand, 1)[0].age}};
        return tree.findDocuments(query)
      }],
      ['lteFindOp', async () => {
        const rand = ~~(Math.random() * (lteFindData.length - 1 + 1) + 0);
        const query = {age: {$lte: lteFindData.splice(rand, 1)[0].age}};
        return tree.findDocuments(query)
      }],
      ['inFindOp', async () => {
        const rand = ~~(Math.random() * (inFindData.length - 3 ) + 0);
        const val1 = inFindData.splice(rand, 1)[0].age;
        const val2 = inFindData.splice(rand, 1)[0].age;
        const val3 = inFindData.splice(rand, 1)[0].age;
        const query = {age: {$in: [val1, val2,val3] }};
        return tree.findDocuments(query)
      }],
      ['ninFindOp', async () => {
        const rand = Math.floor(Math.random() * (ninFindData.length - 3 ) + 0);

        const val1 = ninFindData.splice(rand, 1)[0].age;
        const val2 = ninFindData.splice(rand, 1)[0].age;
        const val3 = ninFindData.splice(rand, 1)[0].age;
        const query = {age: {$nin: [val1, val2, val3] }};
        return tree.findDocuments(query)
      }]
    ];

    const processNext = async (jobFn, jobName) => {
      await jobFn();
      standard[jobName].executedOp += 1;
      if (standard[jobName].executedOp < standard[jobName].maxOp) {
        await processNext(jobFn, jobName)
      }
    };

    for (let _job of jobs) {
      const jobName = _job[0];
      const jobFn = _job[1];
      const timer = new Timer();
      timer.start();

      await processNext(jobFn, jobName);
      timer.stop();
      standard[jobName].duration = timer.duration.ms / 1000;
      standard[jobName].ops = standard[jobName].executedOp / (timer.duration.ms / 1000);

      console.log(`Finished ${jobName} in ${timer.duration.ms} ms [${standard[jobName].ops}] ops`)
    }
  });
  it('should display result', function (done) {
    const totalDuration = reduce(standard,(acc, cur)=> acc += cur.duration,0);
    const totalOps = reduce(standard,(acc, cur)=> acc += cur.executedOp,0);
    const avgOps = totalOps / totalDuration;
    console.log(`======== SBTree ${version} - Extended`)
    console.log(`= $ne : ${standard.negFindOp.ops} op/s [${standard.negFindOp.executedOp}]`)
    console.log(`= $gt : ${standard.gtFindOp.ops} op/s [${standard.gtFindOp.executedOp}]`)
    console.log(`= $gte : ${standard.gteFindOp.ops} op/s [${standard.gteFindOp.executedOp}]`)
    console.log(`= $lt : ${standard.ltFindOp.ops} op/s [${standard.ltFindOp.executedOp}]`)
    console.log(`= $lte : ${standard.lteFindOp.ops} op/s [${standard.lteFindOp.executedOp}]`)
    console.log(`= $in : ${standard.inFindOp.ops} op/s [${standard.inFindOp.executedOp}]`)
    console.log(`= $nin : ${standard.ninFindOp.ops} op/s [${standard.ninFindOp.executedOp}]`)
    console.log(`= ======== Summary`)
    console.log(`= Total : ${totalOps} operations`)
    console.log(`= Duration : ${totalDuration} s`)
    console.log(`= Avg : ${avgOps} op/s`)
    done();
  });

});

