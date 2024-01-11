import { SBTree } from '../../index.js';
import { Timer } from '../../src/utils/time.js';
import fakeData from '../fixtures/age.js';
import { version } from '../../package.json';

let tree;
const standard = {
  writeOp: {
    maxOp: fakeData.length,
    executedOp: 0,
    duration: 0,
    ops: 0,
  },
  getOp: {
    maxOp: fakeData.length,
    executedOp: 0,
    duration: 0,
    ops: 0,
  },
  findOp: {
    maxOp: fakeData.length,
    executedOp: 0,
    duration: 0,
    ops: 0,
  },
};
describe('SBTree - Performance - Multi-Trees (index/field) benchmark within test ', async function () {
  this.timeout(20000);
  before((done) => {
    console.log(`Will process ${fakeData.length} elements`);
    tree = new SBTree({ order: 127 });
    tree.on('ready', () => {
      done();
    });
  });

  it('should be fast', async () => {
    const writeData = JSON.parse(JSON.stringify(fakeData));
    const findData = JSON.parse(JSON.stringify(fakeData));
    const getData = JSON.parse(JSON.stringify(fakeData));

    const jobs = [
      ['writeOp', async () => {
        const data = writeData.splice(Math.floor(Math.random() * (writeData.length - 1 + 1) + 0), 1)[0];
        return tree.insertDocuments(data);
      }],
      ['getOp', async () => {
        const data = getData.splice(Math.floor(Math.random() * (getData.length - 1 + 1) + 0), 1)[0];
        return tree.getDocument(data._id);
      }],
      ['findOp', async () => {
        const rand = Math.floor(Math.random() * (findData.length - 1 + 1) + 0);
        const el = findData.splice(rand, 1)[0];
        const query = {};
        query.age = el.age;
        if (rand % 2 === 0) {
          query.country = el.country;
        }
        if (rand % 3 === 0) {
          query.gender = el.gender;
        }
        if (rand % 4 === 0) {
          query.firstname = el.firstname;
        }
        if (rand % 5 === 0) {
          query.email = el.email;
        }
        return await tree.findDocuments(query);
      }],
    ];

    const processNext = async (jobFn, jobName) => {
      await jobFn();
      standard[jobName].executedOp += 1;
      if (standard[jobName].executedOp < standard[jobName].maxOp) {
        await processNext(jobFn, jobName);
      }
    };

    for (const _job of jobs) {
      const jobName = _job[0];
      const jobFn = _job[1];
      const timer = new Timer();
      timer.start();

      await processNext(jobFn, jobName);
      timer.stop();
      standard[jobName].duration = timer.duration.ms / 1000;
      standard[jobName].ops = standard[jobName].executedOp / (timer.duration.ms / 1000);

      console.log(`Finished ${jobName} in ${timer.duration.ms} ms [${standard[jobName].ops}] ops`);
    }
  });
  it('should display result', (done) => {
    const totalDuration = standard.writeOp.duration + standard.getOp.duration + standard.findOp.duration;
    const totalOps = standard.writeOp.executedOp + standard.getOp.executedOp + standard.findOp.executedOp;
    const avgOps = (standard.writeOp.ops + standard.getOp.ops + standard.findOp.ops) / 3;
    console.log(`======== SBTree ${version} - Multi-tree Benchmark from mocha`);
    console.log(`= Write : ${standard.writeOp.ops} op/s [${standard.writeOp.executedOp}]`);
    console.log(`= Get : ${standard.getOp.ops} op/s [${standard.getOp.executedOp}]`);
    console.log(`= Find : ${standard.findOp.ops} op/s [${standard.findOp.executedOp}]`);
    console.log(`= Total : ${totalOps} operations`);
    console.log(`= Duration : ${totalDuration} s`);
    console.log(`= Avg : ${avgOps} op/s`);
    done();
  });
});
