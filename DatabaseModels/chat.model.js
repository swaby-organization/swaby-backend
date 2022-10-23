'use strict';

const Chat = ( sequelize, DataTypes ) => {
    const chat = sequelize.define( 'Chat', {
        messages: {
            type: DataTypes.ARRAY( DataTypes.STRING ),
            allowNull: false
        },
        users: {
            type: DataTypes.ARRAY( DataTypes.INTEGER ),
            defaultValue: []
        }
    } );
    return chat;
};

module.exports = Chat;