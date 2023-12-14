const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const sequelize = require('../db/index');

const User = require('../db/models/user.model');

const controller = {
    logIn: async (req, res) => {
        try {
            const { usuario, password } = req.body;
            let user = await User.findOne({
                where: { usuario: usuario }
            });
            if (user === null) {
                return  res.send({
                    type: "Error",
                    message: "Usuario o contraseña invalido"
                });         
            };
            let correctPassword = await bcrypt.compare(password,user.password);
            if (!correctPassword) {
                return  res.send({
                    type: "Error",
                    message: "Usuario o contraseña invalido"
                });
            };
            console.log(user.chofer);
            await sequelize.query(`
                EXEC sp_UsuariosInsertar 
                '${user.usuario}', 
                '${user.nombre}', 
                '${user.password}', 
                '${user.correo}', 
                ${user.tipo},
                1, 
                '${dayjs().format('YYYYMMDD')}',
                ${user.activo === true ? 1 : 0},
                ${user.chofer}
            `);
            user = await User.findOne({
                where: { usuario: usuario }
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
            user.ultimoAcceso.setDate(user.ultimoAcceso.getDate()+1)
            await sequelize.query(`
                EXEC sp_UsuariosInsertar 
                '${user.usuario}', 
                '${user.nombre}', 
                '${user.password}', 
                '${user.correo}', 
                ${user.tipo},
                0,
                '${dayjs(user.ultimoAcceso).format('YYYYMMDD')}', 
                ${user.activo},
                ${user.chofer}
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