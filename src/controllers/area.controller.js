const sequelize = require('../db/index');

const Area = require('../db/models/area.model');

const controller = {
    getAreas: async (req, res) => {
        try {
            let areas = await Area.findAll();
            return res.send(areas);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getArea: async (req, res) => {
        try {
            const { area } = req.params;
            let AREA = await Area.findByPk(area);
            return res.send(AREA);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    createArea: async (req, res) => {
        try {
            const { area, descripcion } = req.body;
            await sequelize.query(`EXEC sp_AreasInsertar '${area}', '${descripcion}', 1`);
            return res.send({
                type: "Success",
                message: "Area fue creada satisfactoriamente"
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    deleteArea: async (req, res) => {
        try {
            const { area } = req.query;
            await sequelize.query(`EXEC sp_AreasBorrar '${area}'`);
            return res.send({
                type: "Success",
                message: "Area eliminada satisfactoriamente"
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