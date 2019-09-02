const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile')
const Directory = require('../../Directory/Directory')

function stringify(obj, options) {
  let spaces;
  let EOL = '\n';
  if (typeof options === 'object' && options !== null) {
    if (options.spaces) {
      spaces = options;
    }
    if (options.EOL) {
      EOL = options;
    }
  }
  const str = JSON.stringify(obj, options ? options.replacer : null, spaces);
  return str.replace(/\n/g, EOL) + EOL;
}

module.exports = async function create(p, data = '') {
  console.log('Should create file', p)
  const self = this;
  console.log('a', p, data)

  return new Promise(async (res, rej) => {
    console.log('b')
    await Directory.ensure(path.dirname(p));
    console.log('c')
    const exist = await this.exists(p);
    console.log('f', p, data)
    const write = (resolver, lock) => {
      console.log('write data', p, data)
      fs.writeFile(p, stringify(data), (err) => {
        // if (lock) lock.release();
        // else console.log('no lock?')
        console.log('!!!!!!!!!!!!!!',err)
        if (err) return (err);
        resolver(true);
      });
    };

    if (exist) {
      // const lock = await slocket(p);
      try {
        write(res, /*lock*/);
      } catch (e) {
        console.error('CREATE', p, 'error');
        console.error(e);
      }
    } else write(res);
  })
}
