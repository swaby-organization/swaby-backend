'use strict';

const { itemCollection, userCollection, itemModel, userModel } = require('../DatabaseModels');

async function getItemById(req, res) {
    try {
        const id = req.params.id;
        const item = await itemCollection.read(id, userModel);
        if (item) {
            res.status(200).json({
                item: {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    sellingPrice: item.sellingPrice,
                    sellingStatus: item.sellingStatus,
                    uploadedImages: item.uploadedImages,
                    category: item.category,
                    swapFor: item.swapFor,
                    cityOfSwap: item.cityOfSwap,
                    countryOfSwap: item.countryOfSwap,
                    status: item.status,
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
            });
        } else {
            res.status(500).send('Error: Getting item failed');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error: Getting item failed');
    }
}

async function getItemsByUser(req, res) {
    try {
        const userid = req.params.userid;
        const items = await itemModel.findAll({
            where: {
                owner: userid,
                status: 'active'
            }
        } );
        if ( items ) {
            res.status( 200 ).json( {
                items: items,
            });
        } else {
            res.status(500).send('Error: Getting items failed');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error: Getting items failed');
    }
}

async function getAllItems(req, res) {
    try {
        const items = await itemModel.findAll({
            where: {
                status: 'active'
            },
            include: userModel
        });

        if (items) {
            res.status(200).json({
                items: items
            });
        } else {
            res.status(500).send('Error: Getting items failed');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error: Getting items failed');
    }
}


async function createItem(req, res) {
    try {
        req.body.sellingPrice = parseInt(req.body.sellingPrice);
        req.body.owner = parseInt(req.body.owner);
        if (req.files) {
            let arr = [];
            req.files.forEach(element => {
                arr.push(`${process.env.BACKENDLINK}/${element.filename}`);
            });;
            req.body.uploadedImages = arr;
        }
        const item = await itemCollection.create(req.body);
        if (item) {
            const user = await userModel.findOne( {
                where: {
                    id:item.owner,
                }
            } );
            await userCollection.update( item.owner, {...user, points: user.points + 3})
            res.status(200).json({
                item: {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    sellingPrice: item.sellingPrice,
                    sellingStatus: item.sellingStatus,
                    uploadedImages: item.uploadedImages,
                    category: item.category,
                    swapFor: item.swapFor,
                    cityOfSwap: item.cityOfSwap,
                    countryOfSwap: item.countryOfSwap,
                    status: item.status,
                    owner: item.owner,
                },
            });
        } else {
            res.status(500).send('Error: Creating item failed');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error: Creating item failed');
    }
}

async function updateItem(req, res) {
    try {
        const id = req.params.id;
        req.body.sellingPrice = parseInt(req.body.sellingPrice);
        req.body.owner = parseInt(req.body.owner);
        if (req.files) {
            let arr = [];
            req.files.forEach(element => {
                arr.push(`${process.env.BACKENDLINK}/${element.filename}`);
            });;
            req.body.uploadedImages = arr;
        }
        const item = await itemCollection.update(id, req.body);
        if (item) {
            res.status(200).json({
                item: {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    sellingPrice: item.sellingPrice,
                    sellingStatus: item.sellingStatus,
                    uploadedImages: item.uploadedImages,
                    category: item.category,
                    swapFor: item.swapFor,
                    cityOfSwap: item.cityOfSwap,
                    countryOfSwap: item.countryOfSwap,
                    status: item.status,
                    owner: item.owner,
                },
            });
        } else {
            res.status(500).send('Error: Updating item failed');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error: Updating item failed');
    }
}

async function deleteItem ( req, res ) {
    try {
        const id = req.params.id;
        const item = await itemCollection.delete( id );
        if ( item ) {
            res.status( 200 ).send( 'Item deleted' );
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
    getItemById,
    getItemsByUser,
    getAllItems,
    updateItem,
    deleteItem
};