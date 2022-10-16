'use strict';

const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const errorHandler404= require('./error-handlers/404');
const errorHandler500=require ('./error-handlers/500');

app.use( cors() );
app.use( express.json() );


app.get( '/', ( req, res ) => {
    res.status( 200 ).send( 'Server is up and alive' );
} );

const start = ( port ) => {
    app.listen( port, () => console.log( `Listening on port ${port}` ) );
};

app.use(errorHandler404);
app.use(errorHandler500);
module.exports = {
    app,
    start
};