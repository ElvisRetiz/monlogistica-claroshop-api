const dayjs = require('dayjs');
const sequelize = require('../db/index');

const Guide = require('../db/models/guide.model');

const controller = {
    getGuides: async (req, res) => {
        try {
            let guides = await Guide.findAll();
            return res.send(guides);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getGuidesByOrder: async (req, res) => {
        try {
            const { orden } = req.params;
            let guides = await Guide.findAll({
                where: { orden: orden }
            });
            return res.send(guides)
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    markGuidesAsCollected: async (req, res) => {
        try {
            const { orden, guia, fecha }  = req.body;
            let guideDate = new Date(fecha);
            guideDate.setDate(guideDate.getDate()+1);
            await sequelize.query(`EXEC sp_RecoleccionGuiasInsertar ${orden},'${guia}','${dayjs(guideDate).format('YYYYMMDD')}'`);
            return  res.send({
                type: "Succes",
                message: "Las guias fueron marrcadas como recolectadas con exito"
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    markGuideAsDelivered: async (req, res) => {
        try {
            const { orden, guia, fecha, recibePersona, fotoIfe, fotoCasa }  = req.body;
            let guideDate = new Date(fecha);
            guideDate.setDate(guideDate.getDate()+1);
            await sequelize.query(`EXEC sp_RecoleccionGuiasEntrega ${orden},'${guia}','${dayjs(guideDate).format('YYYYMMDD')}','${recibePersona}','${fotoIfe}','${fotoCasa}'`);
            return  res.send({
                type: "Succes",
                message: "La guia fue marrcada como entregada con exito"
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    }
};

module.exports = controller;