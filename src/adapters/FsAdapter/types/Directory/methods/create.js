const fs = require('fs');
const path = require('path');
module.exports = async function create(p) {
  const self = this;
  return new Promise((resolve, reject) => {
    fs.mkdir(p, async (err) => {
      // if there is no error or if folder already exists
      if (!err || (err.code === 'EEXIST')) {
        return resolve(true);
      } if (err.code === 'ENOENT') {
        // Create parent
        await self.create(path.dirname(p));
        return resolve(self.create(p));
      }
      return reject(err);
    });
  });
}
