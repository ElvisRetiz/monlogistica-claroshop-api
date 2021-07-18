const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Order extends Model {};

Order.init({
    orden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true
    },
    almacen: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    cliente: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    sucursal: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    paquetes: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    usuarioCaptura: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    estatus: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    choferRecoleccion: {
        type: DataTypes.CHAR,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Order',
    tableName: 'OrdenesRecoleccion',
    timestamps: false
});

module.exports = Order;