'use strict';

const jwt = require( 'jsonwebtoken' );

module.exports = ( sequelize, DataTypes ) => {
    const user = sequelize.define( 'user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: 'https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg'
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        points: {
            type: DataTypes.INTEGER,
            defaultValue: 10
        },
        token: {
            type: DataTypes.VIRTUAL,
            get () {
                return jwt.sign( { username: this.username }, process.env.SECRET );
            }
        },
    } );
    user.authenticateToken = token => {
        return jwt.verify( token, process.env.SECRET, ( err, decoded ) => {
            if ( err ) {
                return err;
            } else {
                return decoded;
            }
        } );
    };
    return user;
};