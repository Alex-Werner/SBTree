const waitFor = async (watchedObject, watchedProp, successCallback) => {
  let int = null;
  return new Promise(async (resolve, reject) => {
    const resolver = () => {
      if (watchedObject[watchedProp]) {
        if(successCallback){
          successCallback();
        }
        clearInterval(int);
        return resolve(true)
      }
    };
    int = setInterval(resolver, 100)
  });
};
module.exports = {waitFor};
