import { expect } from 'chai';
import crypto from './crypto.js'; // Adjust the path based on your project structure

describe('crypto module', () => {
  describe('insecureRandomBytes', () => {
    it('should generate an array of random bytes', () => {
      const bytes = crypto.insecureRandomBytes(4);
      expect(bytes).to.have.lengthOf(4);
      expect(bytes).to.be.instanceof(Uint8Array);
    });
  });

  describe('generateRandId', () => {
    it('should generate a random ID with a specified prefix', () => {
      const id = crypto.generateRandId('test');
      expect(id).to.be.a('string');
      expect(id.startsWith('test')).to.be.true;
    });

    it('should generate a random ID without a prefix', () => {
      const id = crypto.generateRandId();
      expect(id).to.be.a('string');
    });
  });

    describe('generateLeafId', () => {
        it('should generate a random leaf ID', () => {
        const id = crypto.generateLeafId();
        expect(id).to.be.a('string');
        expect(id.startsWith('l')).to.be.true;
        });
    });

    describe('generateFieldTreeId', () => {
        it('should generate a random field tree ID', () => {
        const id = crypto.generateFieldTreeId();
        expect(id).to.be.a('string');
        expect(id.startsWith('f')).to.be.true;
        });
    });

    describe('generateTreeId', () => {
        it('should generate a random tree ID', () => {
        const id = crypto.generateTreeId();
        expect(id).to.be.a('string');
        expect(id.startsWith('t')).to.be.true;
        });
    });

    describe('generateNodeId', () => {
        it('should generate a random node ID', () => {
        const id = crypto.generateNodeId();
        expect(id).to.be.a('string');
        expect(id.startsWith('n')).to.be.true;
        });
    });

    describe('generateRootId', () => {
        it('should generate a random root ID', () => {
        const id = crypto.generateRootId();
        expect(id).to.be.a('string');
        expect(id.startsWith('r')).to.be.true;
        });
    });

    describe('randomBytes', () => {
        it('should generate an array of random bytes', async () => {
        const bytes = await crypto.randomBytes(4);
        expect(bytes).to.have.lengthOf(4);
        expect(bytes).to.be.instanceof(Uint8Array);
        });
    });

});

