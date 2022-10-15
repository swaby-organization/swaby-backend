'use strict';

require( 'dotenv' ).config();
const { db } = require( './DatabaseModels' );
const server = require( './server' );

db.sync().then( () => {
    server.start( process.env.PORT || 3001 );
} ).catch( ( err ) => {
    console.log( `Database connection error : ${err}` );
} );