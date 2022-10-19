'use strict';

const { signup, signin } = require( '../controllers/user.controller' );
const { checkDuplicate } = require( '../middlewares/checkDuplicate' );
const { getUserProfile, getLoggedInUserInfo, editUserInfo } = require( '../controllers/user.controller' );
const { uploadAvatar } = require( '../upload/uploadAvatar' );
const bearerAuth = require( '../middlewares/bearerAuth' );
const router = require( 'express' ).Router();



router.post( '/signup', uploadAvatar.single( 'avatar' ), checkDuplicate, signup );
router.post( '/signin', signin );
router.get( '/userprofile/:id', getUserProfile );
router.get( '/userinfo/:id', bearerAuth, getLoggedInUserInfo );
router.post( '/userinfo/:id', uploadAvatar.single( 'avatar' ), bearerAuth, editUserInfo );

module.exports = router;