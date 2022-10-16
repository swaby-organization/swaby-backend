'use strict';

const { signup, signin, valid, userInfo } = require( '../controllers/user.controller' );
const bearerAuth = require( '../middlewares/bearerAuth' );
const {saveUser} = require( '../middlewares/basicAuth' );

const router = require( 'express' ).Router();

router.get( '/user' , bearerAuth, userInfo );
router.post( '/signup' , saveUser, signup );
router.post( '/signin' , valid, signin );


module.exports = router;