module.exports = function getFieldNamesFromQuery(query){
  const fieldNames = [];
  Object.entries(query).forEach((field)=>{
    let fieldName = field[0];

    if(field[1].constructor === Object){
      fieldName+='.'+getFieldNamesFromQuery(field[1]);
    }
    fieldNames.push(fieldName);
  });
  return fieldNames;
}
