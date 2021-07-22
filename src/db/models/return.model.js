const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Return extends Model {};

Return.init({
    guia: {
        type: DataTypes.CHAR,
        allowNull: false,
        primaryKey: true
    },
    intento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    fechaDevolucionAlmacen: {
        type: DataTypes.DATE,
        allowNull: true
    },
    motivoDevolucion: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    devueltaTienda: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    fechaDevolucionTienda: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Return',
    tableName: 'Devoluciones',
    timestamps: false
});

module.exports = Return;