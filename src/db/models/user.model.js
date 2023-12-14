const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class User extends Model {};

User.init({
    usuario: {
        type: DataTypes.CHAR,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    password: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    correo: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    tipo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    dentro: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }, 
    ultimoAcceso: {
        type: DataTypes.DATE,
        allowNull: true
    },
    chofer: {
        type: DataTypes.CHAR,
        allowNull: true
    },
},{
    sequelize,
    modelName: 'User',
    tableName: 'Usuarios',
    timestamps: false
})

module.exports = User;