'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const user = require( './user.model' );
const collection = require( '../collections/user.collection' );

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://osxrgggttodvqw:69b0afa53828bf306fc9f28669899a1310de5ed9b0490005b327489929012af9@ec2-3-219-19-205.compute-1.amazonaws.com:5432/degsh4uiodbcpb' ;

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

const sequelize = new Sequelize( DATABASE_URL , sequelizeOption );
const userCollection = collection( sequelize, DataTypes );
const userModel = user( sequelize , DataTypes );

module.exports = {
    db: sequelize,
    userModel,
    userCollection
};