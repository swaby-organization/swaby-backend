'use strict';

const { itemCollection, itemModel, userModel } = require( '../DatabaseModels' );

async function getItemById ( req, res ) {
    try {
        const item = await itemCollection.read( id, userModel );
        if ( item ) {
            res.status( 200 ).json( {
                item: {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    estimatedValue: item.estimatedValue,
                    uploadedImages: item.uploadedImages,
                    category: item.category,
                    swapFor: item.swapFor,
                    cityOfSwap: item.cityOfSwap,
                    countryOfSwap: item.countryOfSwap,
                    owner: item.owner,
                    user: {
                        id: item.user.id,
                        username: item.user.username,
                        email: item.user.email,
                        city: item.user.city,
                        country: item.user.country,
                        avatar: item.user.avatar,
                    }
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
        const items = await itemModel.findAll( {
            where: {
                owner: id
            }
        } );
        if ( items ) {
            
            res.status( 200 ).json( {
                items: items,
            } );
        } else {
            res.status( 500 ).send( 'Error: Getting items failed' );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Error: Getting items failed' );
    }
}

async function getAllItems ( req, res ) {
    try {
        const items = await itemCollection.read( null, userModel );

        if ( items ) {
            res.status( 200 ).json( {
                items: items
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
        req.body.estimatedValue = parseInt( req.body.estimatedValue );
        req.body.owner = parseInt( req.body.owner );
        if ( req.files ) {
            let arr = [];
            req.files.forEach( element => {
                arr.push( `${process.env.BACKENDLINK}/${element.filename}` );
            } );;
            req.body.uploadedImages = arr;
        }
        const item = await itemCollection.create( req.body );
        if ( item ) {
            res.status( 200 ).json( {
                item: {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    estimatedValue: item.estimatedValue,
                    uploadedImages: item.uploadedImages,
                    category: item.category,
                    swapFor: item.swapFor,
                    cityOfSwap: item.cityOfSwap,
                    countryOfSwap: item.countryOfSwap,
                    owner: item.owner,
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
        req.body.estimatedValue = parseInt( req.body.estimatedValue );
        req.body.owner = parseInt( req.body.owner );
        if ( req.files ) {
            let arr = [];
            req.files.forEach( element => {
                arr.push( `${process.env.BACKENDLINK}/${element.filename}` );
            } );;
            req.body.uploadedImages = arr;
        }
        const item = await itemCollection.update( id, req.body );
        if ( item ) {
            res.status( 200 ).json( {
                item: {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    estimatedValue: item.estimatedValue,
                    uploadedImages: item.uploadedImages,
                    category: item.category,
                    swapFor: item.swapFor,
                    cityOfSwap: item.cityOfSwap,
                    countryOfSwap: item.countryOfSwap,
                    owner: item.owner,
                },
            } );
        } else {
            res.status( 500 ).send( 'Error: Updating item failed' );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Error: Updating item failed' );
    }
}

module.exports = {
    createItem,
    getItemById,
    getItemsByUser,
    getAllItems,
    updateItem,
};