'use strict';

// create the item controller where the user can create items and delete items

const { itemCollection, itemModel } = require( '../DatabaseModels' );

const itemCollectionObj = new itemCollection( itemModel );

const createItem = async ( req, res ) => {
    try {
        const { name, 
            description, 
            category, 
            uploadedImages 
            } = req.body;

        const itemInfo = { name, description, category, uploadedImages };
        
        const item = await itemCollectionObj.create( itemInfo );
        if ( item ) {
            res.status( 200 ).json( item );
        } else {
            res.status( 500 ).send( 'Error: Creating item failed' );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Error: Creating item failed' );
    }
}

const deleteItem = async ( req, res ) => {

    try {
        const { id } = req.params;
        const item = await itemCollectionObj.delete( id );
        if ( item ) {
            res.status( 200 ).json( item );
        } else {
            res.status( 500 ).send( 'Error: Deleting item failed' );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Error: Deleting item failed' );
    }
}

module.exports = {
    createItem,
    deleteItem
}