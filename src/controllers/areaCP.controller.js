const sequelize = require('../db/index');

const AreaCP = require('../db/models/areaCP.model');

const controller = {
    getAreasCP: async (req, res) => {
        try {
            let areascp = await AreaCP.findAll();
            return res.send(areascp);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getAreaByCP: async (req, res) => {
        try {
            const { codigopostal } = req.params;
            let areacp = await AreaCP.findAll({
                where: { codigoPostal: codigopostal }
            });
            return res.send(areacp);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getCPByArea: async (req, res) => {
        try {
            const { area } = req.params;
            let areacp = await AreaCP.findAll({
                where: { area: area }
            });
            return res.send(areacp);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    createAreaCP: async (req, res) => {
        try {
            const { area, codigoPostal } = req.body;
            await sequelize.query(`EXEC sp_AreasCPInsertar '${area}', '${codigoPostal}'`);
            let data = await AreaCP.findOne({
                where: { codigoPostal: codigoPostal }
            });
            return res.send({
                type: "Success",
                message: "El registro fue creado satisfactoriamente",
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
    deleteAreaCP: async (req, res) => {
        try {
            const { area, codigoPostal } = req.query;
            await sequelize.query(`EXEC sp_AreasCPBorrar '${area}', '${codigoPostal}'`);
            return res.send({
                type: "Success",
                message: "El registro fue eliminado satisfactoriamente"
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