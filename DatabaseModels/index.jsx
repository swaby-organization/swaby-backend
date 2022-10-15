'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const user = require( './user.model' );

const DATABASE_URL = process.env.DATABASE_URL ;

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

const sequelize = new Sequelize( DATABASE_URL , sequelizeOption );

const userModel = user( sequelize , DataTypes );

module.exports = {
    db: sequelize,
    userModel
};