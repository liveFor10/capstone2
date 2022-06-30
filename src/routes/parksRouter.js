const express = require('express');
const mongoDButils = require('../utils/mongoDButils.js');
const { ObjectID } = require('mongodb');
const consts = require('../config/consts.js');
const dataUtil = require('../../public/js/dropdowns.js');

const parksRouter = express.Router();

parksRouter.route('/')
  .get( (req, res) => {
    res.render( 'parks');
  });

parksRouter.route('/search')
  .get( (req, res) => {
    try {
      const filter = mongoDButils.createMongoFiltersFromQueryParams(req.query);
      const sortBy = req.query.sortBy || "LocationName";
      const resultsOrder = req.query.resultsOrder || consts.RESULTS_ORDER_ASC
      const itemsPerPage = req.query.itemsPerPage || consts.ITEMS_PER_PAGE;
      const requestedPageNumber = req.query.requestedPageNumber || consts.REQUESTED_PAGE_NUMBER;
      const maxResults = req.query.maxResults || consts.MAX_RESULTS;
      const queryLimit = maxResults < itemsPerPage ? itemsPerPage : maxResults; 
      let renderObj = {};

      (async function searchParkByParkName() {
        try {
          const db = await mongoDButils.getConnectedMongoDB();
          const parks = await db.collection('parks')
            .find( filter )
            //.sort({ sortBy : parseInt(resultsOrder) } )
            .skip( itemsPerPage * requestedPageNumber )
            .limit( parseInt(queryLimit) )
            .toArray();
          if (parks.length > 0) {
            let sParks = [];
            sParks = resultsOrder === consts.RESULTS_ORDER_ASC ? parks.sort(dataUtil.sortArrayAscending) : parks.sort(dataUtil.sortArrayDescending);
            renderObj.parks = parks;
            renderObj.paginationChunks = Math.ceil(maxResults / itemsPerPage);
          } else {
            renderObj.noResults = "No parks found.";
          }

          res.render( 'parks', renderObj );
        } catch (error) {
          console.log(`parksRouter/search async error=${JSON.stringify(error)}`)
        }
      }())
    } catch (error) {
      console.log(`parksRouter/search get error=${JSON.stringify(error)}`);
    }
  });

parksRouter.route('/:parkID')
  .get((req, res) => {
    const parkID = req.params.parkID;
  
    (async function findParkByParkID() {
      try {
        const db = await mongoDButils.getConnectedMongoDB();
        const park = await db.collection('parks')
          .findOne( { "_id" : new ObjectID(parkID) } );
        res.render('park', { park : park } );
      } catch (error) {
        console.log(`parksRouter/parkID error=${JSON.stringify(error)}`)
      }
    }())
  });

  
module.exports = parksRouter;