const fs = require('fs');
module.exports = async function exists(p) {
  return new Promise((resolve, reject) => {
    fs.stat(p, (err, stats) => {
      if (err && err.code === 'ENOENT') {
        console.log('checked1', err);
        return resolve(false);
      } if (err) {
        console.log('checked3');
        return reject(err);
      }
      if (stats.isFile() || stats.isDirectory()) {
        console.log('checked');
        return resolve(true);
      }
      console.log('checked0');
      return false;
    });
  });
}
