const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Token extends Model {};

Token.init({
    token: {
        type: DataTypes.CHAR,
        allowNull: false,
        primaryKey: true
    },
    guia: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    expira: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Token',
    tableName: 'TokensGuias',
    timestamps: false
});

module.exports = Token;