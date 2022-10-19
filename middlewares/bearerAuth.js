'use strict';
const { userModel } = require('../DatabaseModels')

module.exports = async ( req, res, next ) => {
    if ( !req.headers.authorization ) {
        res.status(401).send( 'Invalid Login' );
    } else {
        const token = req.headers.authorization.split( ' ' ).pop();
        try {
            const validUser = await userModel.authenticateToken( token );
            const userAuth = await userModel.findOne( {
                where: {
                    username: validUser.username
                }
            } );
            if ( userAuth ) {
                next();
            } else {
                res.status(401).send( 'Invalid Login' );
            }
        } catch ( error ) {
            res.status(401).send( error );;
        } 
    }
}