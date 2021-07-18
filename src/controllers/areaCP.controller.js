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
    getAreaCP: async (req, res) => {
        try {
            const { area, codigopostal } = req.params;
            let areacp = await AreaCP.findOne({
                where: { area: area, codigoPostal: codigopostal }
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
            const { area, codigopostal } = req.body;
            await sequelize.query(`EXEC sp_AreasCPInsertar '${area}', '${codigopostal}'`);
            return res.send({
                type: "Success",
                message: "El registro fue creado satisfactoriamente"
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
            const { area, codigopostal } = req.query;
            await sequelize.query(`EXEC sp_AreasCPBorrar '${area}', '${codigopostal}'`);
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