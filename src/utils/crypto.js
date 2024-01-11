function insecureRandomBytes(size) {
  const result = new Uint8Array(size);
  for (let i = 0; i < size; ++i) {
    result[i] = Math.floor(Math.random() * 256);
  }
  return result;
}

function getRandomBytes() {
  if (typeof require !== 'undefined') {
    try {
      const crypto = require('crypto');
      return crypto.randomBytes;
    } catch (e) {
      return insecureRandomBytes;
    }
  }
  return insecureRandomBytes;
}

function browserRandomBytes(size) {
  return window.crypto.getRandomValues(new Uint8Array(size));
}

const isWindowContext = (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues);
const randomBytesFunction = isWindowContext ? browserRandomBytes : getRandomBytes();

const crypto = {
  insecureRandomBytes,
  randomBytes: isWindowContext ? browserRandomBytes : getRandomBytes(),
  generateRandId: (prefix = '') => prefix + (Date.now().toString(16) + crypto.randomBytes(4).toString('hex')),
  generateLeafId: () => crypto.generateRandId('l'),
  generateFieldTreeId: () => crypto.generateRandId('f'),
  generateTreeId: () => crypto.generateRandId('t'),
  generateNodeId: () => crypto.generateRandId('n'),
  generateRootId: () => crypto.generateRandId('r'),
};

export default crypto;
