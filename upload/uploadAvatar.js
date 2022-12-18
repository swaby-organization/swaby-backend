'use strict';

const multer = require( 'multer' );
const path = require( 'path' );
const uuid = require( 'uuid' ).v4;


const storage = multer.diskStorage(
    {
        destination: function ( req, file, callBack ) {
            callBack( null, 'avatars' );
        },
        filename: ( req, file, callBack ) => {
            callBack( null, file.fieldname + '-' + req.body.username + '-'+ uuid()+ path.extname( file.originalname ) );
        }
    } );

const uploadAvatar = multer( {
    storage: storage
} );

module.exports = {
    uploadAvatar
};