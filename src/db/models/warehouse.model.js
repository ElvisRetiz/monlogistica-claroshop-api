const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Warehouse extends Model {};

Warehouse.init({
    almacen:{
        type: DataTypes.CHAR,
        allowNull: false,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Warehouse',
    tableName: 'Almacenes',
    timestamps: false
});

module.exports = Warehouse;