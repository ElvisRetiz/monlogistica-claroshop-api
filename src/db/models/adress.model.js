const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Adress extends Model {};

Adress.init({
    cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre:  {
        type: DataTypes.CHAR,
        allowNull: true
    },
    direccion:  {
        type: DataTypes.CHAR,
        allowNull: true
    },
    numeroExt:  {
        type: DataTypes.CHAR,
        allowNull: true
    },
    numeroInt:  {
        type: DataTypes.CHAR,
        allowNull: true
    },
    colonia:  {
        type: DataTypes.CHAR,
        allowNull: true
    },
    ciudad:  {
        type: DataTypes.CHAR,
        allowNull: true
    },
    estado:  {
        type: DataTypes.CHAR,
        allowNull: true
    },
    codigoPostal:  {
        type: DataTypes.CHAR,
        allowNull: true
    },
    entreCalles:  {
        type: DataTypes.CHAR,
        allowNull: true
    },
    telefono:  {
        type: DataTypes.CHAR,
        allowNull: true
    },
    email:  {
        type: DataTypes.CHAR,
        allowNull: true
    },
    activo:  {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Adress',
    tableName: 'Direcciones',
    timestamps: false
});

module.exports = Adress;