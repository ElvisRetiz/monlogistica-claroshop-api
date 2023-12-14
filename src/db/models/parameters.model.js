const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Parameter extends Model {};

Parameter.init({
    nombreTabla: {
        type: DataTypes.CHAR,
        allowNull: true,
        primaryKey: true
    },
    nombreCampo: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    valorCampo: {
        type: DataTypes.CHAR,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Parameter',
    tableName: 'Parametros',
    timestamps: false
});

module.exports = Parameter;