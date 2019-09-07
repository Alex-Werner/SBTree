const chance = require('chance');
const ObjectID = require('mongo-objectid');

const c = chance();

const firstname = c.first();
const lastname = c.last();
const country = c.country({raw:true})

const doc = {
  _id : new ObjectID().toString(),
  age : c.age(),
  firstname:firstname,
  lastname:firstname,
  country:country.name,
  gender:c.gender(),
  email:`${firstname.toLowerCase()}@${lastname.toLowerCase()}.${country.abbreviation.toLowerCase()}`
}
console.log(doc)
