'use strict';
require( 'dotenv' ).config();
const { Sequelize, DataTypes } = require( 'sequelize' );
const user = require( './user.model' );
const item = require( './item.model' );
const Collection = require( '../collections/collection' );

const DATABASE_URL = process.env.DATABASE_URL;

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

const sequelize = new Sequelize("postgres://osxrgggttodvqw:69b0afa53828bf306fc9f28669899a1310de5ed9b0490005b327489929012af9@ec2-3-219-19-205.compute-1.amazonaws.com:5432/degsh4uiodbcpb", sequelizeOption);

const userModel = user(sequelize, DataTypes);
const itemModel = item(sequelize, DataTypes);

const userCollection = new Collection(userModel);
const itemCollection = new Collection(itemModel);

userModel.hasMany(itemModel, { foreignKey: 'owner' });
itemModel.belongsTo(userModel, { foreignKey: 'owner' });

module.exports = {
    db: sequelize,
    userModel,
    itemModel,
    userCollection,
    itemCollection
};