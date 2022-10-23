"use strict";

const bcrypt = require( "bcrypt" );
const base64 = require( "base-64" );

const { userModel, userCollection, itemModel } = require( "../DatabaseModels" );

const signup = async ( req, res ) => {
    try {
        if (req.file) {
            req.body.avatar = `${process.env.BACKENDLINK}/${req.file.filename}`;
        }
        const {
            username,
            firstName,
            lastName,
            email,
            password,
            avatar,
            country,
            city,
        } = req.body;
        
        const userInfo = {
            username,
            firstName,
            lastName,
            avatar,
            email,
            password: await bcrypt.hash( password, 10 ),
            country,
            city,
        };
        const user = await userCollection.create( userInfo );
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
                    points: user.points
                },
                token: user.token,
            } );
        } else {
            res.status( 500 ).send( "Error: Creating user failed" );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( "Error: Creating user failed" );
    }
};

const signin = async ( req, res ) => {
    try {
        const basicAuth = req.headers.authorization.split( " " ).pop();
        const [ username, password ] = base64.decode( basicAuth ).split( ":" );
        const user = await userModel.findOne( {
            where: {
                username,
            },
            include: itemModel
        } );
        const valid = await bcrypt.compare( password, user.password );
        if ( valid ) {
            await userCollection.update(user.id,{...user, points: user.points + 1} )
            return res.status( 200 ).json( {
                user: {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    country: user.country,
                    city: user.city,
                    avatar: user.avatar,
                    items: user.items,
                    points:user.points
                },
                token: user.token,
            } );
        }
        return res.status( 401 ).send( "You are not authorized" );
    } catch ( err ) {
        console.log( err );
        return res.status( 401 ).send( "You are not authorized" );
    }
};

async function getUserProfile( req, res ) {
    try {
        const id = req.params.id;
        const user = await userModel.findOne( {
            where: {
                id,
            },
            include: itemModel,
        } );

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
                    items: user.items,
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
        const user = await userCollection.read( id , itemModel);
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
                    items: user.items,
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
        if (req.file) {
            req.body.avatar = `${process.env.BACKENDLINK}/${req.file.filename}`;
        }
        const id = req.params.id;
        const {
            username,
            firstName,
            lastName,
            email,
            country,
            city,
            avatar,
        } = req.body;

        const userInfo = {
            username,
            firstName,
            lastName,
            email,
            country,
            city,
            avatar,
        };
        
        const user = await userCollection.update( id, userInfo );
        if ( user ) {
            userCollection.read( id, itemModel ).then( ( user ) => {
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
                    items: user.items,
                },
            } );
        } );
        } else {
            res.status( 500 ).send( 'Error: Updating user info failed' );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Error: Updating user info failed' );
    }
}

module.exports = {
    signup,
    signin,
    getUserProfile,
    getLoggedInUserInfo,
    editUserInfo,
};