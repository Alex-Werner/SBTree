const waitFor = async (watchedObject, watchedProp, successCallback) => {
  return new Promise( (resolve, reject) => {
    let int = null;
    const resolver = () => {
      console.log('exec')

      if (watchedObject[watchedProp]) {
        if(successCallback){
          successCallback();
        }
        console.log('clear')
        int = clearInterval(int);
        return resolve(true)
      }
    };
    console.log('set')
    int = setInterval(resolver, 20)
    setTimeout(resolver, 10000);
  });
};
module.exports = {waitFor};
