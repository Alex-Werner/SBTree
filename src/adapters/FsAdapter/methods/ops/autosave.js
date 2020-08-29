module.exports = async function autosave(self){
  const next = async (self)=>{
    if((self.lastChange!==null && self.lastSave===null) || (self.lastChange>self.lastSave)){
      await self.saveDatabase();
    }
    setTimeout(async ()=>{
      if(self.autoSave){
        await next(self);
      }
    }, self.autoSaveInterval)
  }
  await next(self);
}
