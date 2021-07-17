const Sequelize = require('sequelize');
const sequelize = require('../db/index');

const User = require('../db/models/user.model');

const controller = {
    getUsers: async (req,res) => {
        try {
            let users = await User.findAll();
            return res.send(users)
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            })
        }
    },
    getUser: async (req,res) => {
        try {
            const { usuario } = req.params;
            let user = await User.findByPk(usuario)
            return res.send(user);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            })
        }
    },
    createUser: async (req, res) => {
        try {
            const { usuario, nombre, password, correo, tipo } = req.body;

            await sequelize.query(`EXEC sp_UsuariosInsertar '${usuario}','${nombre}','${password}','${correo}',${tipo},0,NULL,1`);
            return res.send({
                type: "Success",
                message: "El usuario fue creado satisfactoriamente"
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            })
        }
    },
    deleteUser: async (req,res) => {
        try {
            const { usuario } = req.query;
            await sequelize.query(`EXEC sp_UsuariosBorrar '${usuario}'`);
            return res.send({
                type: "Success",
                message: "El usuario fue eliminado satisfactoriamente"
            })

        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    }
}

module.exports = controller;