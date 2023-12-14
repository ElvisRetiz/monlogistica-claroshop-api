const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Area extends Model {};

Area.init({
    area: {
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
    },
    zona: {
        type: DataTypes.CHAR,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Area',
    tableName: 'Areas',
    timestamps: false
})

module.exports = Area;