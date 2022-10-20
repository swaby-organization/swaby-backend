'use strict';


const express = require( 'express' );
const { getAllItems, getItemById, getItemsByUser, createItem, updateItem, deleteItem } = require( '../controllers/item.controller' );
const { uploadItemImages } = require( '../upload/uploadItemImages' );
const router = express.Router();


router.get( '/items', getAllItems );
router.get( '/items/:id', getItemById );
router.get( '/itemsbyuser/:userid', getItemsByUser );
router.post( '/items', uploadItemImages.array( "uploadedImages", 4 ), createItem );
router.post( '/items/:id', uploadItemImages.array( "uploadedImages", 4 ),updateItem );
router.delete( '/items/:id', deleteItem );


module.exports = router;

