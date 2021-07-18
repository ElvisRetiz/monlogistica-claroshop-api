const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class AreaCP extends Model {};

AreaCP.init({
    area: {
        type: DataTypes.CHAR,
        allowNull: false,
        primaryKey: true
    },
    codigoPostal: {
        type: DataTypes.CHAR,
        allowNull: false,
        primaryKey: true
    }
},{
    sequelize,
    modelName: 'AreaCP',
    tableName: 'AreasCP',
    timestamps: false
});

module.exports = AreaCP;