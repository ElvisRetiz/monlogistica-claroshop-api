const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
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
            });
        }
    },
    getUser: async (req,res) => {
        try {
            const { usuario } = req.params;
            let user = await User.findByPk(usuario);
            return res.send(user);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    createUser: async (req, res) => {
        try {
            const { usuario, nombre, password, correo, tipo } = req.body;
            let user = await User.findByPk(usuario);
            if (!user) {
                let hashPassword = await bcrypt.hash(password,5);
                await sequelize.query(`EXEC sp_UsuariosInsertar '${usuario}','${nombre}','${hashPassword}','${correo}',${tipo},0,NULL,1`);
            } else {
                console.log("PASSWORD: ", !password);
                let hashPassword = user.password;
                let userName = user.nombre;
                let userMail = user.correo;
                let userType = user.tipo;
                let userLastConnection = user.ultimoAcceso;
                if (password) {
                    hashPassword = await bcrypt.hash(password,5);
                };
                if (nombre) {
                    userName = nombre;
                };
                if (correo) {
                    userMail = correo;
                };
                if (tipo) {
                    userType = tipo;
                };
                if (userLastConnection) {
                    user.ultimoAcceso.setDate(user.ultimoAcceso.getDate()+1);
                    userLastConnection = `'${dayjs(user.ultimoAcceso).format('YYYYMMDD')}'`;
                };
                await sequelize.query(`EXEC sp_UsuariosInsertar '${usuario}','${userName}','${hashPassword}','${userMail}',${userType},${user.dentro === true ? 1 : 0},${userLastConnection},${user.activo === true ? 1 : 0}`);
            }
            return res.send({
                type: "Success",
                message: "El usuario fue creado satisfactoriamente"
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    deleteUser: async (req,res) => {
        try {
            const { usuario } = req.query;
            await sequelize.query(`EXEC sp_UsuariosBorrar '${usuario}'`);
            return res.send({
                type: "Success",
                message: "El usuario fue eliminado satisfactoriamente"
            });
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