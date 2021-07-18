const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Guide extends Model {};

Guide.init({
    orden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    guia: {
        type: DataTypes.CHAR,
        allowNull: false,
        primaryKey: true
    },
    estatus: {
        type: DataTypes.CHAR,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Guide',
    tableName: 'OrdenesRecoleccionGuias',
    timestamps: false
});

module.exports = Guide;