'use strict';


const express = require( 'express' );
const bearerAuth = require( '../middlewares/bearerAuth' );
const router = express.Router();


const {  userModel } = require( '../DatabaseModels' );

router.get( '/userprofile/:id', bearerAuth, getUserProfile );
router.get( '/userinfo/:id', bearerAuth,  getLoggedInUserInfo );
router.post( '/userinfo/:id', bearerAuth, editUserInfo );



async function getUserProfile( req, res ) {
    try {
        const id = req.params.id;
        const user = await userModel.read( id );

        if ( user ) {
            res.status( 200 ).json( {
                user: {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    country: user.country,
                    city: user.city,
                    avatar: user.avatar,
                },
            } );
        } else {
            res.status( 500 ).send( 'Error: Getting user profile failed' );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Error: Getting user profile failed' );
    }
}

async function getLoggedInUserInfo( req, res ) {
    try {
        const id = req.params.id;
        const user = await userModel.read( id );

        if ( user ) {
            res.status( 200 ).json( {
                user: {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    country: user.country,
                    city: user.city,
                    avatar: user.avatar,
                },
            } );
        } else {
            res.status( 500 ).send( 'Error: Getting user profile failed' );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Error: Getting user profile failed' );
    }
}

async function editUserInfo( req, res ) {
    try {
        const id = req.params.id;
        const {
            username,
            firstName,
            lastName,
            email,
            country,
            city,
        } = req.body;

        const userInfo = {
            username,
            firstName,
            lastName,
            email,
            country,
            city,
        };

        const user = await userModel.update( id, userInfo );
        if ( user ) {
            res.status( 200 ).json( {
                user: {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    country: user.country,
                    city: user.city,
                    avatar: user.avatar,
                },
            } );
        } else {
            res.status( 500 ).send( 'Error: Updating user info failed' );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Error: Updating user info failed' );
    }
}

module.exports = router;


