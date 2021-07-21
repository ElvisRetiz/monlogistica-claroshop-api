const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Parameter extends Model {};

Parameter.init({
    cantidadDevoluciones: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Parameter',
    tableName: 'Parametros',
    timestamps: false
});

module.exports = Parameter;