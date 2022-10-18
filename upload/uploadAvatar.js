'use strict';

const multer = require( 'multer' );
const path = require( 'path' );


const storage = multer.diskStorage(
    {
        destination: 'avatars/',
        filename: ( req, file, callBack ) => {
            callBack( null, file.fieldname + '-' + req.body.username + path.extname( file.originalname ) );
        }
    } );

const uploadAvatar = multer( {
    storage: storage
} );

module.exports = {
    uploadAvatar
};