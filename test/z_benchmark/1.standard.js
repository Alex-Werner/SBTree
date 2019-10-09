const {expect} = require('chai');
const {SBTree} = require('../../index');
const fakeData = require('../fixtures/age')
const {Timer} = require('../../src/utils/time');
const {version} = require('../../package.json');
const {each} = require('lodash');

let tree;
let standard = {
  writeOp: {
    maxOp: fakeData.length,
    executedOp: 0,
    duration: 0,
    ops: 0
  },
  getOp: {
    maxOp: fakeData.length,
    executedOp: 0,
    duration: 0,
    ops: 0
  },
  findOp: {
    maxOp: fakeData.length,
    executedOp: 0,
    duration: 0,
    ops: 0
  },
  removeOp: {
    maxOp: fakeData.length,
    executedOp: 0,
    duration: 0,
    ops: 0
  }
}
describe('SBTree - Performance - Standard Benchmark within test ', async function () {
  this.timeout(10000)
  before((done) => {
    console.log(`Will process ${fakeData.length} elements`);
    tree = new SBTree({order: 127});
    tree.on('ready', () => {
      done();
    });
  })

  it('should be fast', async function () {

    const writeData = JSON.parse(JSON.stringify(fakeData));
    const findData = JSON.parse(JSON.stringify(fakeData));
    const getData = JSON.parse(JSON.stringify(fakeData));
    const removeData = JSON.parse(JSON.stringify(fakeData));

    const jobs = [
      ['writeOp', async () => {
        const len = writeData.length;
        if (len > 0) {
         const document = writeData.splice(Math.floor(Math.random() * (writeData.length - 1 + 1) + 0), 1)[0];
          return tree.insertDocuments(document);
        }
      }],
      ['getOp', async () => {
        const len = getData.length;
        if (len > 0) {
          const data = getData.splice(Math.floor(Math.random() * (getData.length - 1 + 1) + 0), 1)[0];
          return tree.getDocument(data._id);
        }
      }],
      ['findOp', async () => {
        const len = findData.length;
        if (len > 0) {
          const rand = Math.floor(Math.random() * (findData.length - 1 + 1) + 0);
          const query = {age: findData.splice(rand, 1)[0].age};
          return tree.findDocuments(query)
        }
      }],
      ['removeOp', async () => {
        const len = removeData.length;
        if (len > 0) {
          const rand = Math.floor(Math.random() * (removeData.length - 1 + 1) + 0);
          const query = {_id: removeData.splice(rand, 1)[0]._id};
          return tree.deleteDocuments(query)
        }
      }]
    ];

    const processNext = async (jobFn, jobName) => {
      return new Promise(async (resolve, reject) =>{
        await jobFn();
        standard[jobName].executedOp += 1;
        if (standard[jobName].executedOp < standard[jobName].maxOp) {
          await processNext(jobFn, jobName)
        }
        resolve();
      })
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
  it('should display result', async function (done) {
    const totalDuration = standard.writeOp.duration + standard.getOp.duration + standard.findOp.duration + standard.removeOp.duration;
    const totalOps = standard.writeOp.executedOp + standard.getOp.executedOp + standard.findOp.executedOp + standard.removeOp.executedOp;
    const avgOps = (standard.writeOp.ops + standard.getOp.ops + standard.findOp.ops + standard.removeOp.ops) / 4;
    console.log(`======== SBTree ${version} - Benchmark from mocha`)
    console.log(`= Write : ${standard.writeOp.ops} op/s [${standard.writeOp.executedOp}]`)
    console.log(`= Get : ${standard.getOp.ops} op/s [${standard.getOp.executedOp}]`)
    console.log(`= Find : ${standard.findOp.ops} op/s [${standard.findOp.executedOp}]`)
    console.log(`= Remove : ${standard.removeOp.ops} op/s [${standard.removeOp.executedOp}]`)
    console.log(`= ======== Summary`)
    console.log(`= Total : ${totalOps} operations`)
    console.log(`= Duration : ${totalDuration} s`)
    console.log(`= Avg : ${avgOps} op/s`)
    done();
  });

});

