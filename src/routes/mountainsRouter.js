const express = require('express');
const mongoDButils = require('../utils/mongoDButils.js');
const { ObjectID } = require('mongodb');
const consts = require('../config/consts.js');

const mountainsRouter = express.Router();

mountainsRouter.route('/')
  .get( (req, res) => {
    res.render( 'mountains');
  });

mountainsRouter.route('/search')
  .get( (req, res) => {
    try {
      mountain = {};
      mountain.name = req.mountainName;

      const maxItemsPerQuery = consts.MAX_ITEMS_PER_QUERY;
      const itemsPerPage = req.query.ipp || consts.ITEMS_PER_PAGE;
      let queryLimit; 
      const requestedPageNumber = req.query.rpn || consts.REQUESTED_PAGE_NUMBER;
      const sortOrderAscending = req.query.so || consts.SORT_ORDER_ASC

      queryLimit = maxItemsPerQuery < itemsPerPage ? itemsPerPage : maxItemsPerQuery; 

      (async function searchMountainByMountainName() {
        try {
          const db = await mongoDButils.getConnectedMongoDB();
          const mountains = await db.collection('mountains')
            .find( { "name": mountain.name } )
            .sort({ "name" : sortOrderAscending } )
            .skip( itemsPerPage * requestedPageNumber )
            .limit( queryLimit )
            .toArray();
          if (parks) {
            res.render( 'mountains', { mountains: mountains } );
          } else {
            res.render( 'mountains');
          }
        } catch (error) {
          console.log(`mountainsRouter/search error=${JSON.stringify(error)}`)
        }
      }())
    } catch (error) {
      console.log(`mountainsRouter/search error=${JSON.stringify(error)}`);
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