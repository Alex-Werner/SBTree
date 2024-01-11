// Import the required libraries
import { expect } from 'chai';
import { Timer } from './time.js';

describe('Timer class', () => {
  let timer;

  beforeEach(() => {
    // Reset the timer before each test
    timer = new Timer();
  });

  describe('start method', () => {
    it('should set startTs to a non-zero value', () => {
      timer.start();
      expect(timer.startTs).to.be.a('number');
      expect(timer.startTs).to.be.greaterThan(0);
    });
  });

  describe('stop method', () => {
    it('should calculate duration correctly', (done) => {
      timer.start();
      setTimeout(() => {
        timer.stop();

        expect(timer.duration).to.have.property('ms');
        expect(timer.duration).to.have.property('s');
        expect(timer.duration).to.have.property('nano');

        expect(timer.duration.ms).to.be.a('number');
        expect(timer.duration.s).to.be.a('number');
        expect(timer.duration.nano).to.be.a('number');

        // Since it's a timer, we expect some time to have elapsed
        expect(timer.duration.ms).to.be.greaterThan(0);
        expect(timer.duration.s).to.be.greaterThan(0);
        expect(timer.duration.nano).to.be.greaterThan(0);

        done();
      }, 100); // delay in milliseconds
    });
  });
});
