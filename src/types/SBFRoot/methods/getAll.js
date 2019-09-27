async function getAll() {
  let result = [];

  let p = [];
  this.childrens.forEach((child) => {
    p.push(child.getAll());
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

module.exports = getAll;
