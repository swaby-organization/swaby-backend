'use strict';

module.exports = ( sequelize, DataTypes ) => {
    const item = sequelize.define( 'item', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sellingPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sellingStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cityOfSwap: {
            type: DataTypes.STRING,
            allowNull: false
        },
        countryOfSwap: {
            type: DataTypes.STRING,
            allowNull: false
        },
        swapFor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uploadedImages: {
            type: DataTypes.ARRAY( DataTypes.STRING ),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM( 'active', 'pending', 'swapped'),
            defaultValue: 'active'
        },
    } );
    return item;
}