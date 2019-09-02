const {expect} = require('chai');
const FSQueue = require('../../../../../src/adapters/FsAdapter/types/FSQueue/FSQueue');
const Job = require('../../../../../src/adapters/FsAdapter/types/FSQueue/types/Job');
const Directory = require('../../../../../src/adapters/FsAdapter/types/Directory/Directory')
describe('FSQueue', () => {
  let queue, job;
  let path = '.fsQueue-tests';
  let usersPath = path+'/users-'+Date.now();
  it('should initialize', function () {
    queue = new FSQueue({autoexec: false})
    expect(queue.queue).to.deep.equal([]);
    expect(queue.options.autoexec).to.equal(false);
  });
  it('should create a command and return a job element', function () {
    const addedJob = queue.add('Directory.exists',usersPath);
    expect(addedJob.constructor.name).to.equal(Job.name);
    expect(addedJob.state).to.equal('queued');
    expect(queue.queue.length).to.equal(1);
    expect(queue.queue).to.deep.equal([addedJob]);
  });
  it('should get a job from queue', function () {
    job = queue.get();
    expect(job.command).to.equal('Directory.exists');
    expect(job.state).to.equal('queued');
  });
  it('should process a command and mutate job element', async function() {
    const job2 = queue.add('Directory.create',usersPath);

    await queue.processNext();
    expect(job.state).to.equal('executed');
    expect(job.results).to.equal(false);

    await queue.processNext();
    expect(job2.state).to.equal('executed');
    expect(job2.results).to.equal(true);

    const job3 = queue.add('Directory.exists',usersPath);
    await queue.processNext();
    expect(job3.state).to.equal('executed');
    console.log(job3)
    expect(job3.results).to.equal(true);
  });
  it('should works with file - SBTree work case', async function () {
    const doc = {"_id":"5d6d4123117055fa0b17bb15","email":"jean@valjean.fr", "age":27}
    const {_id, email, age} = doc;

    const createJob = queue.add('File.create',`${usersPath}/${doc._id}.json`, Object.assign({}, {_id, email}));
    const readJob = queue.add('File.read',`${usersPath}/${doc._id}.json`);

    // We process
    await queue.processNext();
    await queue.processNext();

    //Queue is empty, file is existing now, let's read it.

    const storeDoc = readJob.results;
    expect(storeDoc).to.deep.equal(Object.assign({}, {_id, email}));

    const updateJob = queue.add('File.create',`${usersPath}/${doc._id}.json`, Object.assign({}, storeDoc,{ age }))
    await queue.processNext();

    const verifyJob =  queue.add('File.read',`${usersPath}/${doc._id}.json`);
    await queue.processNext();

    expect(verifyJob.results).to.deep.equal(doc);
  });
});
