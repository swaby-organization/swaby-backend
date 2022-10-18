'use strict';

const { signup, signin } = require( '../controllers/user.controller' );
const { basicAuth } = require( '../middlewares/basicAuth' );

const { uploadAvatar } = require( '../upload/uploadAvatar' );
const router = require( 'express' ).Router();


router.post( '/signup', uploadAvatar.single( 'avatar' ), basicAuth, signup );
router.post( '/signin', signin );



module.exports = router;