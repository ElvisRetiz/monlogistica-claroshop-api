const sequelize = require('../db/index');

const Adress = require('../db/models/adress.model');

const controller = {
    getAdresses: async (req, res) => {
        try {
            let adresses = await Adress.findAll();
            return res.send(adresses);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getAdress: async (req, res) => {
        try {
            const { cliente } = req.params;
            let adress = await Adress.findOne({
                where: { cliente: cliente }
            });
            return res.send(adress);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    createAdress: async (req, res) => {
        try {
            const {
                cliente,
                codigo,
                nombre,
                direccion,
                numeroExt,
                numeroInt,
                colonia,
                ciudad,
                estado,
                codigoPostal,
                entreCalles,
                telefono,
                email
            } = req.body;
            await sequelize.query(`
            EXEC sp_DireccionesInsertar 
            ${cliente},
            ${codigo},
            '${nombre}',
            '${direccion}',
            '${numeroExt}',
            '${numeroInt}',
            '${colonia}',
            '${ciudad}',
            '${estado}',
            '${codigoPostal}',
            '${entreCalles}',
            '${telefono}',
            '${email}',
            1
            `);
            return res.send({
                type: "Success",
                message: "La direccion fue registrada satisfactoriamente"
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    deleteAdress: async (req, res) => {
        try {
            const { cliente, codigo } = req.query;
            await sequelize.query(`EXEC sp_DireccionesBorrar ${cliente}, ${codigo}`);
            return res.send({
                type: "Success",
                message: "La direccion fue eliminada satisfactoriamente"
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