'use strict';

const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const errorHandler404 = require( './error-handlers/404' );
const errorHandler500 = require( './error-handlers/500' );
const userEndPoints = require( './routes/user.route' );
const itemsEndPoints = require( './routes/items.route' );
require( 'dotenv' ).config();
app.use( cors() );
app.use( express.json() );
app.use( express.static( 'avatars' ) );
app.use( express.static( 'itemsImages' ) );
app.use( userEndPoints );
app.use( itemsEndPoints );

app.get( '/', ( req, res ) => {
    res.status( 200 ).send( 'Server is up and alive' );
} );

const http = require( 'http' );
const server = http.createServer( app );
const { Server } = require( 'socket.io' );
const io = new Server( server, {
    cors: {
        origin: '*',
    }
} );

// create a private chat room between two users and add it to the database if it doesn't exist already 
io.on( 'connection', ( socket ) => {
    socket.on( 'join_room', ( { user1, user2 } ) => {
        const roomName = [ user1, user2 ].sort().join( '' );
        socket.join( roomName );
    } );
    socket.on( 'chat message', ( { message, user1, user2 } ) => {
        const roomName = [ user1, user2 ].sort().join( '' );
        console.log( 'message', message );
        io.to( roomName ).emit( 'chat message', { message, user1, user2 } );
    } );
} );



const start = ( port ) => {
    server.listen( port, () => console.log( `Listening on port ${port}` ) );
};

app.use( errorHandler404 );
app.use( errorHandler500 );
module.exports = {
    app,
    start
};