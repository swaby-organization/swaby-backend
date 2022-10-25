'use strict';

module.exports = ( err, req, res, next ) => {
    res.status( 404 ).json( 'Not Found' );
}