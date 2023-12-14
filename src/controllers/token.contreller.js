const fs = require('fs');
const dayjs = require('dayjs');
const sequelize = require('../db/index');

const GuideHelper = require('../helpers/guide.helper');
const ObjectsHelper = require('../helpers/objects.helper');
const Guide = require('../db/models/guide.model');
const Token = require('../db/models/token.model');
const Parameter = require('../db/models/parameters.model');

const controller = {
    generateToken: async (req, res) => {
        try {
            const { 
                descripcion, 
                valor, 
                dimensiones, 
                pesoVolumetrico, 
                kilometros,
                credenciales
            } = req.body;

            if (!valor || !descripcion || !dimensiones || !pesoVolumetrico || !kilometros || !credenciales) {
                throw new Error('Faltan datos');
            }

            if (Object.keys(credenciales).length === 0) {
                throw new Error('Faltan credenciales');
            }

            if (Object.keys(credenciales).length < 2) {
                throw new Error('Credenciales incompletas');
            }

            const validatedCredentials = await sequelize.query(`SELECT * FROM Credenciales WHERE usuario = '${credenciales.usuario}' AND [password] = '${credenciales.password}'`, { type: sequelize.QueryTypes.SELECT });

            if (validatedCredentials.length === 0) {
                throw new Error('Credenciales inválidas');
            }

            let iteretions = 3;
            let randomizedToken = '';

            let valueToBeTraded = await Parameter.findOne({
                where: {
                    nombreTabla: 'COTIZA',
                    nombreCampo: 'VALOR'
                }
            });

            valueToBeTraded = valueToBeTraded.getDataValue('valorCampo');

            if (!valueToBeTraded) {
                throw new Error(`Uno de los parametros no ha sido especificado. Contacte al administrador`);
            }

            if (valor > parseInt(valueToBeTraded,10)) {
                throw new Error(`El valor del paquete es superior al limite permitido. Valor limite: $${valueToBeTraded}`);
            }

            let weightToBeTraded = await Parameter.findOne({
                where: {
                    nombreTabla: 'COTIZA',
                    nombreCampo: 'PESO'
                }
            });

            weightToBeTraded = weightToBeTraded.getDataValue('valorCampo');

            if (!weightToBeTraded) {
                throw new Error(`Uno de los parametros no ha sido especificado. Contacte al administrador`);
            }

            if (pesoVolumetrico > parseInt(weightToBeTraded,10)) {
                throw new Error(`El peso volumetrico del paquete es superior al limite permitido. Valor limite: ${weightToBeTraded} kg`);
            }

            let kilometersToBeTraded = await Parameter.findOne({
                where: {
                    nombreTabla: 'COTIZA',
                    nombreCampo: 'KILOMETROS'
                }
            });

            kilometersToBeTraded = kilometersToBeTraded.getDataValue('valorCampo');

            if (!kilometersToBeTraded) {
                throw new Error(`Uno de los parametros no ha sido especificado. Contacte al administrador`);
            }

            if (kilometros > parseInt(kilometersToBeTraded,10)) {
                throw new Error(`El rango de kilometros es superior al limite permitido. Valor limite: ${kilometersToBeTraded} km`);
            }

            while(iteretions > 0) {
                randomizedToken = randomizedToken+Math.random().toString(36).substr(2);
                iteretions--
            }

            const guideHelper = new GuideHelper();
            let newGuide = guideHelper.generateGuide();
            let guidesReference = await sequelize.query('SELECT guia FROM OrdenesRecoleccionGuias');

            while (guidesReference.includes(newGuide)) {
                newGuide = guideHelper.generateGuide();
            }

            await sequelize.query(`EXEC sp_GenerarGuiaDeToken '${newGuide}', '${randomizedToken}','${descripcion}',${dimensiones.ancho},${dimensiones.largo},${dimensiones.alto},${pesoVolumetrico}`);

            return res.send({
                type: 'Success',
                data: {
                    token: randomizedToken
                }
            });

        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    generateGuide: async (req, res) => {
        try {
            const { 
                token,
                fechaEnvio,
                pedido,
                remitente,
                destinatario
            } = req.body;

            if (!token || !fechaEnvio || !pedido || !remitente || !destinatario) {
                throw new Error('Faltan datos');
            };

            const destinatarioReference = {
                nombre: "",
                calle: "",
                numeroExt: "",
                colonia: "",
                municipio: "",
                estado: "",
                codigoPostal: "",
                referencias: "",
                telefono: ""
            };

            let objectHelper = new ObjectsHelper();

            if (!objectHelper.sameProperties(destinatarioReference, destinatario)) {
                throw new Error('Faltan datos en el destinatario');
            }

            const tokenToValidate = await Token.findOne({ where: { token: token } });

            if (!tokenToValidate) {
                throw new Error('Token invalido');
            };

            const cliente = await sequelize.query(`SELECT * FROM Clientes WHERE cliente = '${remitente.cliente}'`);

            if (!cliente[0][0]) {
                throw new Error('Cliente invalido');
            };

            const sucursal = await sequelize.query(`SELECT * FROM Sucursales WHERE sucursal = '${remitente.sucursal}'`);

            if (!sucursal[0][0]) {
                throw new Error('Sucursal invalida');
            };

            const paquete = await sequelize.query(`SELECT * FROM OrdenesRecoleccionGuias WHERE guia = (SELECT guia from TokensGuias WHERE token = '${token}')`);

            if (!paquete) {
                throw new Error('Token invalido');
            };

            await sequelize.query(`EXEC sp_ActualizarGuiaDeToken '${paquete[0][0].guia}', '${destinatario.nombre}', '${destinatario.calle}', '${destinatario.numeroExt}', '${destinatario.colonia}', '${destinatario.municipio}', '${destinatario.estado}', '${destinatario.codigoPostal}', '${destinatario.referencias}', '${destinatario.telefono}', '${remitente.cliente}', '${remitente.sucursal}', '${dayjs.utc(fechaEnvio).format('YYYYMMDD hh:mm:ss')}','${pedido}'`);

            let guideToBeReturned = new GuideHelper();
            let htmlToBeReturned = await guideToBeReturned.generateHTML(dayjs.utc(fechaEnvio).format('DD/MM/YYYY'), pedido, remitente, destinatario, paquete[0][0]);
            let pdfGuide = await guideToBeReturned.generatePDF(htmlToBeReturned);

            return res.send({
                type: 'Success',
                data: {
                    pdf: pdfGuide
                }
            });

        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    updateGuide: async (req, res) => {
        try {
            const { guia } = req.body;

            if (!guia) {
                throw new Error('Faltan datos');
            };

            let guideToBeUpdated = await Guide.findOne({ where: { guia: guia } });

            if (!guideToBeUpdated) {
                throw new Error('Guia no encontrada');
            };

            if (guideToBeUpdated.getDataValue('estatus') !== 'Generada') {
                throw new Error('La guia ya ha sido registrada como lista por recolectar.');
            };

            await sequelize.query(`UPDATE OrdenesRecoleccionGuias SET estatus = 'Por Recolectar' WHERE guia = '${guia}'`);

            guideToBeUpdated = await Guide.findOne({ where: { guia: guia } });

            return res.send({
                type: 'Success',
                data: {
                    guia: guideToBeUpdated.getDataValue('guia'),
                    estatus: guideToBeUpdated.getDataValue('estatus')
                }
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