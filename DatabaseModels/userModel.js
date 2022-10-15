'use strict';

const jwt = require( 'jsonwebtoken' );

module.exports = ( sequelize , DataTypes ) => {
    const user = sequelize.define( 'user' , {
        username : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        firstName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        lastName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        country : {
            type : DataTypes.STRING,
            allowNull : false
        },
        city : {
            type : DataTypes.STRING,
            allowNull : false
        },
        token : {
            type : DataTypes.VIRTUAL,
            get () {
                return jwt.sign( { id : this.id } , process.env.SECRET );
            }
        }
    }  );

    
}