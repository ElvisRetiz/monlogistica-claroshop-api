const { initializeApp } = require('firebase/app');
const { getMessaging } = require('firebase/messaging');
const sequelize = require('../db/index');

const controller = {
    suscribeUser: async (req, res) => {
        try {
            const { usuario, token } = req.body;
            await sequelize.query(`EXEC sp_GrabarWebpushData '${usuario}','${token}'`);
            return res.send({
                type: 'Success',
                message: 'Suscripcion exitosa'
            });
        } catch (error) {
            console.log(error);
            return res.send({
                type: 'Error',
                message: 'Error al suscribirse: '+error.message
            });
        }   
    },
    sendNotification: async (req, res) => {
        try {
            const { usuario, mensaje } = req.body;
            
            let token = await sequelize.query(`SELECT webpushData FROM Usuarios WHERE usuario = '${usuario}'`, { type: sequelize.QueryTypes.SELECT });

            const app = initializeApp({
                apiKey: "AIzaSyCpdjrhlFOfIkGo3cgy35Cl1MXmMzGzg2o",
                authDomain: "monlogistica-2a13b.firebaseapp.com",
                projectId: "monlogistica-2a13b",
                storageBucket: "monlogistica-2a13b.appspot.com",
                messagingSenderId: "259929567551",
                appId: "1:259929567551:web:e42955c9692eb25c69638a",
                measurementId: "G-QKN4FTQJRH"
              });

            const message = {
                data: {
                    title: mensaje.titulo,
                    body: mensaje.cuerpo
                },
                token: token
            };

            const idMessage = await getMessaging().send(message);

            return res.send({
                type: 'Success',
                message: 'Notificacion enviada',
                idMessage
            });
        } catch (error) {
          console.log(error);
          return res.send({
            type: 'Error',
            message: 'Error al enviar la notificacion: '+error.message
            });
        }
    }
};

module.exports = controller;