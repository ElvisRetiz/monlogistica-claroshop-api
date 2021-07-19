const dayjs = require('dayjs');
const sequelize = require('../db/index');

const User = require('../db/models/user.model');

const controller = {
    logIn: async (req, res) => {
        try {
            const { usuario, password } = req.body;
            let user = await User.findOne({
                where: { usuario: usuario, password: password }
            });
            if (user === null) {
                return  res.send({
                    type: "Error",
                    message: "Usuario o contraseña invalido"
                });         
            }
            await sequelize.query(`
                EXEC sp_UsuariosInsertar 
                '${user.usuario}', 
                '${user.nombre}', 
                '${user.password}', 
                '${user.correo}', 
                ${user.tipo}, 
                ${user.activo}, 
                1, 
                '${dayjs().format('YYYYMMDD')}',
            `);
            user = await User.findOne({
                where: { usuario: usuario, password: password }
            });
            return res.send({
                type: "Succes",
                message: "",
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
    signOff: async (req, res) => {
        try {
            const { usuario } = req.body;
            let user = await User.findOne({
                where: { usuario: usuario }
            });
            await sequelize.query(`
                EXEC sp_UsuariosInsertar 
                '${user.usuario}', 
                '${user.nombre}', 
                '${user.password}', 
                '${user.correo}', 
                ${user.tipo}, 
                ${user.activo}, 
                0, 
                '${dayjs(user.ultimoAcceso).format('YYYYMMDD')}',
            `);
            return res.send({
                type: "Succes",
                message: "Cierre de sesion exitoso"
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