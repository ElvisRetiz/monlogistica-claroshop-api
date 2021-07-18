const sequelize = require('../db/index');

const Order = require('../db/models/order.model');

const controller = {
    getOrders: async (req, res) => {
        try {
            let orders = await Order.findAll();
            return res.send(orders);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getOrder: async (req, res) => {
        try {
            const { orden } = req.params;
            let order = await Order.findByPk(orden);
            return res.send(order);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    createOrder: async (req, res) => {
        try {
            const {
                orden,
                fecha,
                almacen,
                cliente,
                sucursal,
                paquetes,
                usuarioCaptura,
                estatus,
                choferRecoleccion
             } = req.body;
             await sequelize.query(`
                EXEC sp_OrdenesRecoleccionInsertar
                ${orden},
                '${fecha}',
                '${almacen}',
                ${cliente},
                '${sucursal}',
                ${paquetes},
                '${usuarioCaptura}',
                '${estatus}',
                '${choferRecoleccion}'
             `);
             return res.send({
                type: "Success",
                message: "La orden fue registrada satisfactoriamente"
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const { orden } = req.query;
            await sequelize.query(`EXEC sp_OrdenesRecoleccionBorrar ${orden}`);
            return res.send({
                type: "Success",
                message: "La orden fue eliminada satisfactoriamente"
            })
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    }
};

module.exports = controller;