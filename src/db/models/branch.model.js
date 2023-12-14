const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Branch extends Model {};

Branch.init({
    cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    sucursal: {
        type: DataTypes.CHAR,
        allowNull: false,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    direccion: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    numeroExt: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    numeroInt: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    colonia: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    ciudad: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    estado: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    codigoPostal: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    contacto: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    conTelefono: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    conEmail: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    almacen: {
        type: DataTypes.CHAR,
        allowNull: false,
    }
},{
    sequelize,
    modelName: 'Branch',
    tableName: 'Sucursales',
    timestamps: false
});

module.exports = Branch;