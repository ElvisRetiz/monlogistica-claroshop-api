const dayjs = require('dayjs');
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
    getOrdersPendingToBeAssigned: async (req, res) => {
        try {
            let orders = await Order.findAll({
                where: { estatus: 'Nueva' }
            });
            return res.send({
                type: "Succes",
                message: "",
                data: orders
            })
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getAssignedOrders: async (req, res) => {
        try {
            const { chofer } = req.params;
            let orders = Order.findAll({
                where: { estatus: 'Asignada', choferRecoleccion: chofer }
            });
            return res.send({
                type: "Succes",
                message: "",
                data: orders
            })
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
             let order = await Order.findByPk(orden);
             if (!order) {
                 let dateOrder = new Date(fecha);
                 dateOrder.setDate(dateOrder.getDate()+1);
                await sequelize.query(`
                    EXEC sp_OrdenesRecoleccionInsertar
                    ${orden},
                    '${dayjs(dateOrder).format('YYYYMMDD')}',
                    '${almacen}',
                    ${cliente},
                    '${sucursal}',
                    ${paquetes},
                    '${usuarioCaptura}',
                    '${estatus}',
                    '${choferRecoleccion}'
                `);  
             } else {
                 let dateOrder = order.fecha;
                 let warehouseOrder = order.almacen;
                 let customerOrder = order.cliente;
                 let branchOrder = order.sucursal;
                 let packagesOrder = order.paquetes;
                 let capturingUserOrder = order.usuarioCaptura;
                 let statusOrder = order.estatus;
                 let driverOrder = order.choferRecoleccion;
                 if (fecha) {
                     dateOrder = new Date(fecha);
                     dateOrder.setDate(dateOrder.getDate()+1);
                 };
                 if (almacen) {
                     warehouseOrder = almacen;
                 };
                 if (cliente) {
                     customerOrder = cliente;
                 };
                 if (sucursal) {
                     branchOrder = sucursal;
                 };
                 if (paquetes) {
                     packagesOrder = paquetes;
                 };
                 if (usuarioCaptura) {
                     capturingUserOrder = usuarioCaptura;
                 };
                 if (estatus) {
                     statusOrder = estatus;
                 };
                 if (choferRecoleccion) {
                     driverOrder = choferRecoleccion;
                 };
                 await sequelize.query(`
                    EXEC sp_OrdenesRecoleccionInsertar
                    ${orden},
                    '${dayjs(dateOrder).format('YYYYMMDD')}',
                    '${warehouseOrder}',
                    ${customerOrder},
                    '${branchOrder}',
                    ${packagesOrder},
                    '${capturingUserOrder}',
                    '${statusOrder}',
                    '${driverOrder}'
                `);
             };
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