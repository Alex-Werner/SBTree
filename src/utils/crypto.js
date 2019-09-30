function insecureRandomBytes(size) {
  const result = new Uint8Array(size);
  for (let i = 0; i < size; ++i) result[i] = Math.floor(Math.random() * 256);
  return result;
}

function getRandomBytes() {
  let randomBytes = null;
  try {
    randomBytes = require('crypto').randomBytes;
  } catch (e) {
    // keep the fallback
  }
  if (randomBytes == null) {
    randomBytes = insecureRandomBytes;
  }
  return randomBytes;
}

function browserRandomBytes() {
  let randomBytes = size => window.crypto.getRandomValues(new Uint8Array(size));
  return randomBytes;
}

const isWindowContext = (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues);

const crypto = {
  insecureRandomBytes,
  randomBytes: (isWindowContext) ? browserRandomBytes : getRandomBytes(),
}
crypto.generateRandId = (prefix='') => prefix+(Date.now().toString(16) + crypto.randomBytes(1).toString('hex'));

crypto.generateLeafId = () => crypto.generateRandId('l');
crypto.generateFieldTreeId = () => crypto.generateRandId('f');
crypto.generateTreeId = () => crypto.generateRandId('t');
crypto.generateNodeId = () => crypto.generateRandId('n');
crypto.generateRootId = () => crypto.generateRandId('r');

module.exports = crypto;
