'use strict';

const express = require( 'express' );
const router = express.Router();

const { itemModel } = require( '../DatabaseModels' );

router.get( '/items', getItems );
router.get( '/items/:id', getItemById );
router.get( '/items/:id', getItemsByUser );
router.post( '/items', createItem );
router.put( '/items/:id', updateItem );
router.delete( '/items/:id', deleteItem );

async function getItemById ( req, res ) {
    try {
        const id = req.params.id;
        const item = await itemModel.read( id );

        if ( item ) {
            res.status( 200 ).json( {
                item: {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    image: item.image,
                    category: item.category,
                    user: item.user,
                },
            } );
        } else {
            res.status( 500 ).send( 'Error: Getting item failed' );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Error: Getting item failed' );
    }
}

async function getItemsByUser ( req, res ) {
    try {
        const id = req.params.id;
        const items = await itemModel.read( id );

        if ( items ) {
            res.status( 200 ).json( {
                items: {
                    id: items.id,
                    name: items.name,
                    description: items.description,
                    price: items.price,
                    image: items.image,
                    category: items.category,
                    user: items.user,
                },
            } );
        } else {
            res.status( 500 ).send( 'Error: Getting items failed' );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Error: Getting items failed' );
    }
}

async function getItems ( req, res ) {
    try {
        const items = await itemModel.read();

        if ( items ) {
            res.status( 200 ).json( {
                items: {
                    id: items.id,
                    name: items.name,
                    description: items.description,
                    price: items.price,
                    image: items.image,
                    category: items.category,
                    user: items.user,
                },
            } );
        } else {
            res.status( 500 ).send( 'Error: Getting items failed' );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Error: Getting items failed' );
    }
}


async function createItem ( req, res ) {
    try {
        const item = await itemModel.create( req.body );

        if ( item ) {
            res.status( 200 ).json( {
                item: {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    image: item.image,
                    category: item.category,
                    user: item.user,
                },
            } );
        } else {
            res.status( 500 ).send( 'Error: Creating item failed' );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Error: Creating item failed' );
    }
}

async function updateItem ( req, res ) {
    try {
        const id = req.params.id;
        const item = await itemModel.update( id, req.body );

        if ( item ) {
            res.status( 200 ).json( {
                item: {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    image: item.image,
                    category: item.category,
                    user: item.user,
                },
            } ) ; 
        } else {
            res.status(500).send('Error: Updating item failed');
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Error: Updating item failed' );
    }
}
async function deleteItem(req, res) {
    try {
      const id = req.params.id;
      await itemModel.delete(id);
      res.status(200).send("Item deleted successfuly");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error: Deleting the item failed");
    }
  }

module.exports = router;

