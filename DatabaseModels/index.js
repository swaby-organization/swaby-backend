'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const user = require( './user.model' );
const item = require( './item.model' );
const collection = require( '../collections/user.collection' );

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
const itemModel = item( sequelize , DataTypes );

const userCollection = new collection( sequelize, DataTypes );

userModel.hasMany( itemModel , { foreignKey: 'owner' } );
itemModel.belongsTo( userModel , { foreignKey: 'owner' } );

module.exports = {
    db: sequelize,
    userModel,
    itemModel,
    userCollection
};