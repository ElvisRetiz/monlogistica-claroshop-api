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
            const { usuario, nombre, password, correo, tipo, chofer } = req.body;
            let user = await User.findByPk(usuario);
            if (!user) {
                let hashPassword = await bcrypt.hash(password,5);
                let driver = chofer ? `'${chofer}'` : null ;
                await sequelize.query(`EXEC sp_UsuariosInsertar '${usuario}','${nombre}','${hashPassword}','${correo}',${tipo},0,NULL,1,${driver}`);
            } else {
                let hashPassword = user.password;
                let userName = user.nombre;
                let userMail = user.correo;
                let userType = user.tipo;
                let userLastConnection = user.ultimoAcceso;
                let userDriver = user.chofer;
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
                    userLastConnection = `'${dayjs.utc(user.ultimoAcceso).local().format('YYYYMMDD')}'`;
                };
                if (chofer) {
                    userDriver = chofer; 
                };
                await sequelize.query(`EXEC sp_UsuariosInsertar '${usuario}','${userName}','${hashPassword}','${userMail}',${userType},${user.dentro === true ? 1 : 0},${userLastConnection},${user.activo === true ? 1 : 0},${userDriver}`);
            }
            user = await User.findByPk(usuario);
            return res.send({
                type: "Success",
                message: "El usuario fue creado satisfactoriamente",
                data: user
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