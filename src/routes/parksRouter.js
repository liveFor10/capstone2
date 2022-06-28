const express = require('express');
const mongoDButils = require('../utils/mongoDButils.js');
const { ObjectID } = require('mongodb');
const consts = require('../config/consts.js');

const parksRouter = express.Router();

parksRouter.route('/')
  .get( (req, res) => {
    res.render( 'parks');
  });

parksRouter.route('/search')
  .get( (req, res) => {
    try {
      park = {};
      park.name = req.parkName;

      const maxItemsPerQuery = consts.MAX_ITEMS_PER_QUERY;
      const itemsPerPage = req.query.ipp || consts.ITEMS_PER_PAGE;
      let queryLimit; 
      const requestedPageNumber = req.query.rpn || consts.REQUESTED_PAGE_NUMBER;
      const sortOrderAscending = req.query.so || consts.SORT_ORDER_ASC

      queryLimit = maxItemsPerQuery < itemsPerPage ? itemsPerPage : maxItemsPerQuery; 
      
      (async function searchParkByParkName() {
        try {
          const db = await mongoDButils.getConnectedMongoDB();
          const parks = await db.collection('parks')
            .find( { "name" : parkName } )
            .sort({ "name" : sortOrderAscending } )
            .skip( itemsPerPage * requestedPageNumber )
            .limit( queryLimit )
            .toArray();
          if (parks) {
            res.render( 'parks', { parks: parks } );
          } else {
            res.render( 'parks');
          }
        } catch (error) {
          console.log(`parksRouter/search error=${JSON.stringify(error)}`)
        }
      }())
    } catch (error) {
      console.log(`parksRouter/search error=${JSON.stringify(error)}`);
    }
  });

parksRouter.route('/:parkID')
  .get((req, res) => {
    const parkID = req.params.parkID;
  
    (async function findParkByParkID() {
      try {
        const db = await mongoDButils.getConnectedMongoDB();
        const park = await db.collection('mountains')
          .findOne( { "_id" : new ObjectID(parkID) } );
        res.render('park', { park : park } );
      } catch (error) {
        console.log(`parksRouter/parkID error=${JSON.stringify(error)}`)
      }
    }())
  });

  
module.exports = parksRouter;