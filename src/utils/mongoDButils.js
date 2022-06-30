const { MongoClient } = require('mongodb');
const consts = require('../../src/config/consts.js');


async function getConnectedMongoDB() {

  try {
    const pmfinderURL = consts.mongoURL;
    const pmfinderDB = consts.mongoDB;
    let mongoClient;

    mongoClient = await MongoClient.connect(pmfinderURL);
    const db = mongoClient.db(pmfinderDB)

    return db;

  } catch (error) {
    console.log('mongoDButils.getConnectedMongoDB' + JSON.stringify(error));
  }
}

function createMongoFiltersFromQueryParams(reqQueryParams) {
  let andObj = {};
  let orArray = [];
  let orObj = {};
  let emptyObj = {};

  try {
    for (const key in reqQueryParams) {
      const value = reqQueryParams[key];
      if ( ( ! (consts.EXCLUDE_QUERY_PARAMS.includes(key))  &&  (value !== '') ) ) {
        regOpt = {};
        regOpt.$regex = value.toLowerCase();
        regOpt.$options = 'i';
        andObj[key] = regOpt;
        let currKeyRegOpt = {}
        currKeyRegOpt[key] = regOpt;
        orArray.push( currKeyRegOpt );
      }
    }
    if (reqQueryParams.searchCriteria === consts.SEARCH_CRITERIA_ALL) {
      return andObj;
    } else if (reqQueryParams.searchCriteria === consts.SEARCH_CRITERIA_ANY) {
      if (orArray.length > 1) {
        orObj.$or = orArray;
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

exports.createMongoFiltersFromQueryParams = createMongoFiltersFromQueryParams;
exports.getConnectedMongoDB = getConnectedMongoDB;