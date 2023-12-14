const sequelize = require('../db/index');

const Branch = require('../db/models/branch.model');

const controller = {
    getBranches: async (req, res) => {
        try {
            let branches = await Branch.findAll();
            return res.send({
                type: "Succes",
                message: "",
                data: branches
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            })
        }
    },
    getBranch: async (req, res) => {
        try {
            const { sucursal } = req.params;
            let branch = await Branch.findOne({
                where: { sucursal: sucursal}
            })
            return res.send(branch);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            })
        }
    },
    createBranch: async (req, res) => {
        try {
            const { 
                cliente,
                sucursal,
                descripcion,
                direccion,
                numeroExt,
                numeroInt,
                colonia,
                ciudad,
                estado,
                codigoPostal,
                contacto,
                conTelefono,
                conEmail,
                almacen
             } = req.body;

             await sequelize.query(`EXEC sp_SucursalesInsertar '${cliente}','${sucursal}','${descripcion}','${direccion}','${numeroExt}','${numeroInt}','${colonia}','${ciudad}','${estado}','${codigoPostal}','${contacto}','${conTelefono}','${conEmail}', 1,${almacen}`);
             let data = await Branch.findOne({
                 where: { sucursal: sucursal }
             });
             return res.send({
                type: "Success",
                message: "La sucursal fue registrada satisfactoriamente",
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
    deleteBranch: async (req, res) => {
        try {
            const { sucursal, cliente } = req.query;
            await sequelize.query(`EXEC sp_SucursalesBorrar ${cliente}, '${sucursal}'`);
            return res.send({
                type: "Success",
                message: "La sucursal fue eliminada satisfactoriamente"
            })
        } catch (error) {
            
        }
    }
};

module.exports = controller;