async function findAll() {
  let result = [];

  let p = [];
  this.childrens.forEach((child) => {
    p.push(child.findAll());
  });

  return new Promise((resolve) => {
    Promise
        .all(p)
        .then((res) => {
          res.forEach((resolvedP) => {
            result = result.concat(resolvedP);
          });
          resolve(result);
        });
  })
}

module.exports = findAll;
