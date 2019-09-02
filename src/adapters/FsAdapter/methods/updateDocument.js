module.exports = async function updateDocument(_doc){
  try {
    const doc = await this.openDocument(_doc._id)
    Object.assign(doc, _doc);
    await this.saveDocument(doc);
    return doc;
  }catch (e) {
    if(e.message.slice(0,22)==='CannotReadFileNotFound'){
      await this.saveDocument(_doc);
    }else{
      throw e;
    }
  }
}
