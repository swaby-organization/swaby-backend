'use strict';

const multer = require( 'multer' );
const path = require( 'path' );
const uuid = require( 'uuid' ).v4;

const storage = multer.diskStorage( {
    destination: function ( req, file, callBack ) {
        callBack( null, 'itemsImages/' );
    },
    filename: ( req, file, callBack ) => {
        callBack( null, file.fieldname + '-' + uuid() +path.extname( file.originalname ) );
    }
} );

const uploadItemImages = multer( {
    storage: storage,
    fileFilter: ( req, file, cb ) => {
        if ( file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
            cb( null, true );
        } else {
            cb( null, false );
            return cb( new Error( 'Only .png, .jpg and .jpeg format allowed!' ) );
        }
    }
} );

module.exports = {
    uploadItemImages
};