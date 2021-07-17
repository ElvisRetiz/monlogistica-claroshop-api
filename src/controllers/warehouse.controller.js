const sequelize = require('../db/index');

const Warehouse = require('../db/models/warehouse.model');

const controller = {
    getWarehouses: async (req, res) => {
        try {
            let warehouses = await Warehouse.findAll();
            return res.send(warehouses);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getWarehouse: async (req, res) => {
        try {
            const { almacen } = req.params;
            let warehouse = await Warehouse.findByPk(almacen);
            return res.send(warehouse);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    createWarehouse: async (req, res) => {
        try {
            const { almacen, descripcion } = req.body;
            await sequelize.query(`EXEC sp_AlmacenesInsertar '${almacen}', '${descripcion}', 1`);
            return res.send({
                type: "Success",
                message: "El almacen fue registrado satisfactoriamente"
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    deleteWarehouse: async (req, res) => {
        try {
            const { almacen } = req.query;
            await sequelize.query(`EXEC sp_AlmacenesBorrar '${almacen}'`);
            return res.send({
                type: "Success",
                message: "El almacen fue eliminado satisfactoriamente"
            });
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