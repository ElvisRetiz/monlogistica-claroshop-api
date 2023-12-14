const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Customer extends Model {};

Customer.init({
    cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    razonSocial: {
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
    rfc: {
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
    nombreCorto: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    limiteIntentos: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Customer',
    tableName: 'Clientes',
    timestamps: false
});

module.exports = Customer;