const { MongoClient } = require('mongodb');
const consts = require('../../src/config/consts.js');


async function getConnectedMongoDB() {

  try {
    const pmfinderURL = consts.mongoURL;
    const pmfinderDB = 'capstone2';
    let mongoClient;

    mongoClient = await MongoClient.connect(pmfinderURL);
    const db = mongoClient.db(pmfinderDB)

    return db;

  } catch (error) {
    console.log('mongoDButils.getConnectedMongoDB' + JSON.stringify(error));
  }
}

function createParkFiltersFromQueryParams(reqQueryParams) {

  let andObj = {};     //all you need to AND multiple clauses
  
  // if ORs > 1
  let orArray = [];    //inner set of OR criteria
  let orObj = {};      //outer OR wrapper:  $or = '{ ' + JSON.stringify(orArray) + ' }'
  
  //no ANDs or ORs  
  let emptyObj = {};

  try {
    if (reqQueryParams.location) {
      andObj.title = `${reqQueryParams.location.toLowerCase()}`;
    }
    if (reqQueryParams.type) {
      andObj.city = `${reqQueryParams.type.toLowerCase()}`;
    }

    if (reqQueryParams.searchCriterica === "all") {  // ANDing
      return andObj;
    } else if (reqQueryParams.searchCriterica === "any") {  // ORing

      if (reqQueryParams.location) {
        orArray.push( `{ location: ${reqQueryParams.location.toLowerCase()} }` );
      }
      if (reqQueryParams.type) {
        orArray.push( `{ type: ${reqQueryParams.type.toLowerCase()} }` );
      }
      
      if (orArray.length > 1) {
        orObj.$or = '{ ' + JSON.stringify(orArray) + ' }';
        return orObj;
      } else if (orArray.length == 1) {
        return andObj;
      }
    }

    return emptyObj;

  } catch (error) {
    console.log('mongoDButils.createMongoFiltersFromQueryParams error=' + JSON.stringify(error));
  }
}

exports.createParkFiltersFromQueryParams = createParkFiltersFromQueryParams;
exports.getConnectedMongoDB = getConnectedMongoDB;