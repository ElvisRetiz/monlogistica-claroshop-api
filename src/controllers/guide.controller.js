const dayjs = require('dayjs');
const sequelize = require('../db/index');
const { encode } = require('base64-arraybuffer');

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
    createGuide: async (req, res) => {
        try {
            const { orden, guia, fecha }  = req.body;
            let guideDate = new Date(fecha);
            guideDate.setDate(guideDate.getDate()+1);
            await sequelize.query(`EXEC sp_RecoleccionGuiasInsertar ${orden},'${guia}','${dayjs(guideDate).format('YYYYMMDD')}'`);
            return  res.send({
                type: "Succes",
                message: "Guia registrada con exito"
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    deliveryGuideToWarehouse: async (req, res) => {
        try {
            const { orden, guia, fecha, nombreClienteFinal, direccion, numeroExt, numeroInt, colonia, ciudad, estado, codigoPostal }  = req.body;
            let guideDate = new Date(fecha);
            guideDate.setDate(guideDate.getDate()+1);
            await sequelize.query(`EXEC sp_GuiasEntradaAlmacen ${orden}, '${guia}', '${dayjs(guideDate).format('YYYYMMDD')}', '${nombreClienteFinal}', '${direccion}', '${numeroExt}', '${numeroInt}', '${colonia}', '${ciudad}', '${estado}', '${codigoPostal}'`);
            return  res.send({
                type: "Succes",
                message: "Las guias fueron marrcadas como entregadas a almacen con exito"
            });
        } catch (error) {
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
            let orderNumber = parseInt(orden, 10)
            guideDate.setDate(guideDate.getDate()+1);
            console.log("fotoIfe:", fotoIfe)
            await sequelize.query(`EXEC sp_RecoleccionGuiasEntrega ${orderNumber},'${guia}','${dayjs(guideDate).format('YYYYMMDD')}','${recibePersona}', '${fotoIfe}', '${fotoCasa}'`);
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