const sequelize = require('../db/index');

const Zone = require('../db/models/zones.model');

const controller = {
    getZones: async (req, res) => {
        try {
            let zonas = await Zone.findAll();
            return res.send(zonas);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getZone: async (req, res) => {
        try {
            const { zona } = req.params;
            let ZONA = await Zone.findByPk(zona);
            return res.send(ZONA);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    createZone: async (req, res) => {
        try {
            const { zona, descripcion } = req.body;
            await sequelize.query(`EXEC sp_ZonasInsertar '${zona}', '${descripcion}', 1`);
            let data = await Zone.findByPk(zona);
            return res.send({
                type: "Success",
                message: "Zona fue creada satisfactoriamente",
                data: data
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    deleteZone: async (req, res) => {
        try {
            const { zona } = req.query;
            await sequelize.query(`EXEC sp_ZonasBorrar '${zona}'`);
            return res.send({
                type: "Success",
                message: "Zona eliminada satisfactoriamente"
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