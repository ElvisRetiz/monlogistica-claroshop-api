const sequelize = require('../db/index');

const Parameter = require('../db/models/parameters.model');

const controller = {
    getParameters: async (req, res) => {
        try {
            let parameters = await sequelize.query(`SELECT * FROM Parametros`, { type: sequelize.QueryTypes.SELECT });
            return res.send(parameters);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    updateParameters: async (req, res) => {
        try {
            const { peso, valor, kilometros } = req.body;
            await sequelize.query(`UPDATE Parametros SET valorCampo = '${peso}' WHERE nombreCampo = 'PESO' and nombreTabla = 'COTIZA'`);
            await sequelize.query(`UPDATE Parametros SET valorCampo = '${valor}' WHERE nombreCampo = 'VALOR' and nombreTabla = 'COTIZA'`);
            await sequelize.query(`UPDATE Parametros SET valorCampo = '${kilometros}' WHERE nombreCampo = 'KILOMETROS' and nombreTabla = 'COTIZA'`);
            let parameters = await sequelize.query(`SELECT * FROM Parametros`, { type: sequelize.QueryTypes.SELECT });
            return res.send({
                type: "Success",
                message: "Se actualizaron los parametros",
                parameters
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    updateLimit: async (req, res) => {
        try {
            const { limite } = req.body;
            await sequelize.query(`UPDATE Parametros SET CantidadDevoluciones = ${limite}`);
            return  res.send({
                type: "Succes",
                message: "Cambio realizado satisfactoriamentete"
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