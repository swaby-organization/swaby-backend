'use strict';

const { signup, signin, valid, userInfo } = require( '../controllers/user.controller' );
const bearerAuth = require( '../middlewares/bearerAuth' );
const { basicAuth } = require( '../middlewares/basicAuth' );

const router = require( 'express' ).Router();


router.post( '/signup', basicAuth, signup );
router.post( '/signin',  signin );


module.exports = router;