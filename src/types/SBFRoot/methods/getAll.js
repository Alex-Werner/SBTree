async function getAll() {
  let result = {identifiers:[], keys:[]};

  let p = [];
  this.childrens.forEach((child) => {
    p.push(child.getAll());
  });

  return new Promise((resolve) => {
    Promise
        .all(p)
        .then((res) => {
          res.forEach((resolvedP) => {
            result.identifiers.push(...resolvedP.identifiers);
            result.keys.push(...resolvedP.keys);
          });
          resolve(result);
        });
  })
}

module.exports = getAll;
