'use strict';
const { basicAuth } = require('../middlewares/basicAuth');
const { findeOneItem } = require('../controllers/item.controller');
const router = require('express').Router();


router.get('/findOneItem', basicAuth, findeOneItem);

module.exports = router;
