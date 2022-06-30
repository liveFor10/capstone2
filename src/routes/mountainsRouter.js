const express = require('express');
const mongoDButils = require('../utils/mongoDButils.js');
const { ObjectID } = require('mongodb');
const consts = require('../config/consts.js');
const dataUtil = require('../../public/js/dropdowns.js');

const mountainsRouter = express.Router();

mountainsRouter.route('/')
  .get( (req, res) => {
    res.render( 'mountains');
  });

mountainsRouter.route('/search')
  .get( (req, res) => {
    try {
      const filter = mongoDButils.createMongoFiltersFromQueryParams(req.query);
      const sortBy = req.query.sortBy || "name";
      const resultsOrder = req.query.resultsOrder || consts.RESULTS_ORDER_ASC
      const itemsPerPage = req.query.itemsPerPage || consts.ITEMS_PER_PAGE;
      const requestedPageNumber = req.query.requestedPageNumber || consts.REQUESTED_PAGE_NUMBER;
      const maxResults = req.query.maxResults || consts.MAX_RESULTS;
      const queryLimit = maxResults < itemsPerPage ? itemsPerPage : maxResults; 
      let renderObj = {};

      (async function searchMountainByMountainName() {
        try {
          const db = await mongoDButils.getConnectedMongoDB();
          const mountains = await db.collection('mountains')
          .find( filter )
          //.sort({ sortBy : parseInt(resultsOrder) } )
          .skip( itemsPerPage * requestedPageNumber )
          .limit( parseInt(queryLimit) )
          .toArray();
          if (mountains.length > 0) {
            let sMountains = [];
            sMountains = mountains.sort(dataUtil.sortArrayAscending);
            sMountains = resultsOrder == consts.RESULTS_ORDER_DESC ? sMountains.reverse() : sMountains;
            renderObj.mountains = sMountains;
            renderObj.paginationChunks = Math.ceil(maxResults / itemsPerPage);
          } else {
            renderObj.noResults = "No mountains found.";
          }

          res.render( 'mountains', renderObj );
        } catch (error) {
          console.log(`mountainsRouter/search async error=${JSON.stringify(error)}`)
        }
      }())
    } catch (error) {
      console.log(`mountainsRouter/search get error=${JSON.stringify(error)}`);
    }
  });

mountainsRouter.route('/:mountainID') 
  .get( (req, res) => {
    const mountainID = req.params.mountainID;
  
    (async function findMountainByMountainID() {
      try {
        const db = await mongoDButils.getConnectedMongoDB();
        const mountain = await db.collection('mountains')
          .findOne( { "_id" : new ObjectID(mountainID) } );
        res.render('mountain', { mountain : mountain } );
      } catch (error) {
        console.log(`mountainsRouter/mountainID error=${JSON.stringify(error)}`)
      }
    }())
  });


module.exports = mountainsRouter;