'use strict';

const express = require( 'express' );
const cors = require( 'cors' );
const app = express();

app.use( cors() );
app.use( express.json() );


app.get( '/', ( req, res ) => {
    res.status( 200 ).send( 'Server is up and alive' );
} );

const start = ( port ) => {
    app.listen( port, () => console.log( `Listening on port ${port}` ) );
};

module.exports = {
    app,
    start
};