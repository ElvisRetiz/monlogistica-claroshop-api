const Sequelize = require('sequelize');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
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
    getAssignedOrders: async (req,res) => {
        try {
            let orders = await Order.findAll({
                where: { estatus: 'Asignada' }
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
    getCollectedOrders: async (req,res) => {
        try {
            let orders = await Order.findAll();
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
    getInWarehouseOrders: async (req,res) => {  
        try {
            const { fechaIni, fechaFin } = req.query
            let ordenes = await sequelize.query(`SELECT * FROM OrdenesRecoleccion WHERE estatus = 'En Almacen' AND fecha BETWEEN '${dayjs.utc(fechaIni).format('YYYYMMDD')}' AND '${dayjs.utc(fechaFin).format('YYYYMMDD')}'`);
            return res.send({
                type: "Succes",
                message: "",
                data: ordenes[0]
            })
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getAssignedOrdersByDriver: async (req, res) => {
        try {
            const { chofer } = req.params;
            let orders = await Order.findAll({
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
            dayjs.extend(utc);
            const {
                orden,
                fecha,
                almacen,
                cliente,
                sucursal,
                paquetes,
                usuarioCaptura,
                estatus,
                choferRecoleccion,
                guias
             } = req.body;
             let order = await Order.findByPk(orden);
             let data = "";
             if (!order) {
                data = await sequelize.query(`
                    EXEC sp_OrdenesRecoleccionInsertar
                    ${orden},
                    '${dayjs.utc(fecha).format('YYYYMMDD HH:mm:ss')}',
                    '${almacen}',
                    ${cliente},
                    '${sucursal}',
                    ${paquetes},
                    '${usuarioCaptura}',
                    '${estatus}',
                    ${choferRecoleccion},
                    0
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
                     driverOrder = `'${choferRecoleccion}'`;
                 };
                 data = await sequelize.query(`
                    EXEC sp_OrdenesRecoleccionInsertar
                    ${orden},
                    '${dayjs.utc(dateOrder).format('YYYYMMDD')}',
                    '${warehouseOrder}',
                    ${customerOrder},
                    '${branchOrder}',
                    ${packagesOrder},
                    '${capturingUserOrder}',
                    '${statusOrder}',
                    ${driverOrder},
                    0
                `);
             };
             let guiasDeLaOrden = "";
             guias.forEach((guia,index,array) => {
                 if (index === array.length-1) {
                     guiasDeLaOrden += `'${guia.guia}'`;
                 } else {
                     guiasDeLaOrden += `'${guia.guia}',`;
                 }
             });
             await sequelize.query(`UPDATE OrdenesRecoleccionGuias SET orden = ${data[0][0].orden} WHERE guia in (${guiasDeLaOrden})`);
             return res.send({
                type: "Success",
                message: "La orden fue registrada satisfactoriamente",
                data: data[0][0].orden
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    assignOrder: async (req, res) => {
        try {
            const {
                orden,
                chofer
             } = req.body;
             await sequelize.query(`EXEC sp_RecoleccionesAsignaChofer ${orden}, '${chofer}'`);
             return res.send({
                type: "Success",
                message: "La orden fue asignada satisfactoriamente"
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    unassignOrder:async (req, res) => {
        try {
            const {
                orden
             } = req.body;
             await sequelize.query(`EXEC sp_RecoleccionesDesasignaChofer ${orden}`);
             return res.send({
                type: "Success",
                message: "La orden fue desasignada satisfactoriamente"
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    markOrderAsCollected: async (req, res) => {
        try {
            const {
                orden,
                quienValida,
                firmaValida
             } = req.body;
             await sequelize.query(`EXEC sp_OrdenRecolectada ${orden}, '${quienValida}', '${firmaValida}'`);
             return res.send({
                type: "Success",
                message: "La orden fue marcada como recolectada satisfactoriamente"
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
            const { ordenes } = req.body;
            let ordersToBeRemoved = "";

            ordenes.forEach((order,index,array) => {
                if (index === array.length-1) {
                    ordersToBeRemoved += `${order.orden}`;
                } else {
                    ordersToBeRemoved += `${order.orden},`;
                }
            });

            await sequelize.query(`UPDATE OrdenesRecoleccionGuias SET orden = NULL WHERE orden in (${ordersToBeRemoved})`);

            await sequelize.query(`DELETE OrdenesRecoleccion WHERE orden in (${ordersToBeRemoved})`);

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