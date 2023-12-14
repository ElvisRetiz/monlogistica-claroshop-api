const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Zone extends Model {};

Zone.init({
    zona: {
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
    modelName: 'Zone',
    tableName: 'Zonas',
    timestamps: false
})

module.exports = Zone;