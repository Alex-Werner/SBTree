const waitFor = async (watchedObject, watchedProp, successCallback) => {
  if (watchedObject && watchedObject[watchedProp]) return true;
  return new Promise((resolve, reject) => {
    let int = null;
    const resolver = () => {
      if (watchedObject[watchedProp]) {
        if (successCallback) {
          successCallback();
        }
        int = clearInterval(int);
        return resolve(true);
      }
    };
    int = setInterval(resolver, 20);
    setTimeout(resolver, 10000);
  });
};

export { waitFor };
