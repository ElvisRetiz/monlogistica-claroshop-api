const sequelize = require('../db/index');

const Driver = require('../db/models/driver.model');

const controller = {
    getDrivers: async (req, res) => {
        try {
            let drivers = await Driver.findAll();
            return res.send(drivers);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getDriver: async (req, res) => {
        try {
            const { chofer } = req.params;
            let driver = await Driver.findByPk(chofer);
            return res.send(driver);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    createDriver: async (req, res) => {
        try {
            const { chofer, nombre, empresa } = req.body;
            await sequelize.query(`EXEC sp_ChoferesInsertar '${chofer}', '${nombre}', '${empresa}', 1`);
            return res.send({
                type: "Success",
                message: "El chofer fue registrado satisfactoriamente"
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    deleteDriver: async (req, res) => {
        try {
            const { chofer } = req.query;
            await sequelize.query(`EXEC '${chofer}'`);
            return res.send({
                type: "Success",
                message: "El chofer fue eliminado satisfactoriamente"
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