const { MongoClient } = require('mongodb');
const consts = require('../../src/config/consts.js');


async function getConnectedMongoDB() {

  try {
    const pmfinderURL = consts.mongoURL;
    const pmfinderDB = 'pmfinderDB';
    let mongoClient;

    mongoClient = await MongoClient.connect(pmfinderURL);
    const db = mongoClient.db(pmfinderDB)

    return db;

  } catch (error) {
    console.log('mongoDButils.getConnectedMongoDB' + JSON.stringify(error));
  }
}


exports.getConnectedMongoDB = getConnectedMongoDB;