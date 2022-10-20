// create the basic Auth middleware
'use strict';
const User = require('../DatabaseModels').userModel
const checkDuplicate = async (req, res, next) => {
  try {
    const username = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    if (username) {
      return res.status(409).send('Username Already Taken');
    }
    const email = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (email) {
      return res.status(409).send('Email Already Taken');
    }
    next();
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  checkDuplicate
};