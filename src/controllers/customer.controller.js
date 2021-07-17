const sequelize = require('../db/index');

const Customer = require('../db/models/customer.model');

const controller = {
    getCustomers: async (req, res) => {
        try {
            let customers = await Customer.findAll();
            return res.send(customers)
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getCustomer: async (req, res) => {
        try {
            const { cliente } = req.params;
            let customer = await Customer.findByPk(cliente);
            return res.send(customer);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    createCustomer: async (req, res) => {
        try {
            const { 
                cliente,
                razonSocial,
                direccion,
                numeroExt,
                numeroInt,
                colonia,
                ciudad,
                estado,
                codigoPostal,
                rfc,
                contacto,
                conTelefono,
                conEmail
             } = req.body;

             await sequelize.query(`EXEC sp_ClientesInsertar ${cliente},'${razonSocial}','${direccion}','${numeroExt}','${numeroInt}','${colonia}','${ciudad}','${estado}','${codigoPostal}','${rfc}','${contacto}','${conTelefono}','${conEmail}', 1`);
             return res.send({
                type: "Success",
                message: "El cliente fue registrado satisfactoriamente"
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    deleteCustomer: async (req, res) => {
        try {
            const { cliente } = req.query;
            await sequelize.query(`EXEC sp_ClientesBorrar ${cliente}`);
            return res.send({
                type: "Success",
                message: "El cliente fue eliminado satisfactoriamente"
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