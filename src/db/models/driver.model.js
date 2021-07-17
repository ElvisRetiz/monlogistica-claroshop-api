const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Driver extends Model {};

Driver.init({
    chofer: {
        type: DataTypes.CHAR,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    empresa: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Driver',
    tableName: 'Choferes',
    timestamps: false
});