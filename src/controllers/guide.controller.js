const Sequelize = require('sequelize');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const sequelize = require('../db/index');
const { encode } = require('base64-arraybuffer');

const Guide = require('../db/models/guide.model');
const Order = require('../db/models/order.model');

const controller = {
    getGuides: async (req, res) => {
        try {
            let guides = await Guide.findAll();
            return res.send(guides);
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getGuidesToCollect: async (req, res) => {
        try {
            let guides = await Guide.findAll({
                where: { estatus: 'Por Recolectar', orden: { [Sequelize.Op.eq]: null } },
            });
            return res.send({
                type: "Succes",
                message: "",
                data: guides
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getCollectedGuides: async (req, res) => {
        try {
            const { orden } = req.query;
            let guides = await Guide.findAll({
                where: { estatus: 'Recolectada', orden: orden}
            });
            return res.send({
                type: "Succes",
                message: "",
                data: guides
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getAllCollectedGuides: async (req, res) => {
        try {
            let guides = await sequelize.query(`SELECT * FROM OrdenesRecoleccionGuias WHERE estatus in ('Recolectada','Devuelta a Chofer')`, { type: sequelize.QueryTypes.SELECT })
            return res.send({
                type: "Succes",
                message: "",
                data: guides
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getGuide: async (req, res) => {
        try {
            const { guia } = req.query;
            let guide = await sequelize.query(`select orden, guia, estatus, fechaRecoleccion, fechaEntregaAlmacen, FechaEntregaChofer, fechaDevueltaAlmacen, RecibeFecha from OrdenesRecoleccionGuias where guia = '${guia}'`)
            guide = guide[0][0]
            if(!guide){
                throw Error('Numero de guia no existe');
            }
            return res.send({
                type: "Succes",
                message: "",
                data: guide
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getGuidesByOrder: async (req, res) => {
        try {
            const { orden } = req.params;
            let guides = await Guide.findAll({
                where: { orden: orden }
            });
            return res.send(guides)
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    createGuide: async (req, res) => {
        try {
            dayjs.extend(utc);
            const { orden, guia, fecha }  = req.body;
            await sequelize.query(`EXEC sp_RecoleccionGuiasInsertar ${orden},'${guia}','${dayjs.utc(fecha).local().format('YYYYMMDD HH:mm:ss')}'`);
            let guide = await Guide.findAll({
                where: { guia: guia }
            });
            return  res.send({
                type: "Succes",
                message: "Guia registrada con exito",
                data: guide
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    deliveryGuideToWarehouse: async (req, res) => {
        try {
            dayjs.extend(utc);
            const { orden, guia, fechaEntregaAlmacen }  = req.body;
            await sequelize.query(`EXEC sp_ActualizaGuiasEntradaAlmacen ${orden}, '${guia}', '${dayjs.utc(fechaEntregaAlmacen).format('YYYYMMDD HH:mm:ss')}'`);
            return  res.send({
                type: "Success",
                message: "La guia fue marcada como entregada a almacen con exito"
            });
        } catch (error) {
            console.log(error)
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    returnGuideToWarehouse: async (req, res) => {
        try {
            const { orden, guia } = req.body;
            await sequelize.query(`EXEC sp_GuiasRegresoAlmacen ${orden}, '${guia}'`);
            return  res.send({
                type: "Succes",
                message: "Las guia fue marrcada como entregada a almacen con exito"
            });
        } catch (error) {
            console.log(error)
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    assignGuideToDriver: async (req,res) => {
        try {
            dayjs.extend(utc);
            const { guia, chofer, fecha, posicion }  = req.body;
            let guideDate = new Date(fecha);
            guideDate.setDate(guideDate.getDate());
            await sequelize.query(`EXEC sp_EntregaAsignarChofer '${guia}','${chofer}', '${dayjs.utc(guideDate).local().format('YYYYMMDD HH:mm:ss')}', ${posicion}`);
            return  res.send({
                type: "Succes",
                message: "Las guia fue asignada con exito"
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            })
        }
    },
    assignGuideToDriverToReturn: async (req,res) => {
        try {
            dayjs.extend(utc);
            const { guia, chofer, fecha, posicion }  = req.body;
            let guideDate = new Date(fecha);
            await sequelize.query(`EXEC sp_DevolucionAsignarChofer '${guia}','${chofer}', '${dayjs.utc(guideDate).local().format('YYYYMMDD HH:mm:ss')}', ${posicion}`);
            return  res.send({
                type: "Succes",
                message: "Las guia fue asignada con exito"
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            })
        }
    },
    markGuidesAsCollected: async (req, res) => {
        try {
            dayjs.extend(utc);
            const { orden, guia, fecha }  = req.body;
            let guideDate = new Date(fecha);
            guideDate.setDate(guideDate.getDate());
            await sequelize.query(`EXEC sp_RecoleccionGuiasInsertar ${orden},'${guia}','${dayjs.utc(guideDate).format('YYYYMMDD HH:mm:ss')}'`);
            return  res.send({
                type: "Succes",
                message: "Las guias fueron marrcadas como recolectadas con exito"
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    markGuideAsDelivered: async (req, res) => {
        try {
            dayjs.extend(utc);
            const { orden, guia, fecha, recibePersona, fotoIfe, fotoCasa, fotoOtro }  = req.body;
            let guideDate = new Date(fecha);
            let orderNumber = parseInt(orden, 10)
            guideDate.setDate(guideDate.getDate());
            console.log("fotoIfe:", fotoIfe)
            await sequelize.query(`EXEC sp_RecoleccionGuiasEntrega ${orderNumber},'${guia}','${dayjs.utc(guideDate).format('YYYYMMDD HH:mm:ss')}','${recibePersona}', '${fotoIfe}', '${fotoCasa}', '${fotoOtro}'`);
            return  res.send({
                type: "Succes",
                message: "La guia fue marrcada como entregada con exito"
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    markGuideAsReturnToCustomer: async (req, res) => {
        try {
            dayjs.extend(utc);
            const { orden, guia, fecha, quienValida, firmaValida }  = req.body;
            let guideDate = new Date(fecha);
            let orderNumber = parseInt(orden, 10)
            await sequelize.query(`EXEC sp_RecoleccionGuiasDevolucionCliente ${orderNumber},'${guia}','${dayjs(guideDate).utc().format('YYYYMMDD HH:mm:ss')}','${quienValida}', '${firmaValida}'`);
            return  res.send({
                type: "Succes",
                message: "La guia fue marcada como devuelta al cliente con exito"
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    markGuideToReturn: async (req, res) => {
        try {
            dayjs.extend(utc);
            const { guia, fecha, motivo }  = req.body;
            let guideDate = new Date(fecha);
            guideDate.setDate(guideDate.getDate());
            await sequelize.query(`EXEC sp_DevolucionInsertar '${guia}','${dayjs.utc(guideDate).format('YYYYMMDD HH:mm:ss')}','${motivo}'`);
            return  res.send({
                type: "Succes",
                message: "La guia fue marrcada como devuelta con exito"
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    guideReport: async (req, res) => {
        try {
            const { almacen } = req.params;
            let data = await sequelize.query(`EXEC sp_RepGuiasPorEntregar '${almacen}'`);
            return  res.send({
                type: "Succes",
                message: "",
                data: data
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getGuidesByDriver: async (req, res) => {
        try {
            const {chofer, fecha} = req.query;
            dayjs.extend(utc);
            let guides = await sequelize.query(`EXEC sp_GuiasChofer '${chofer}', '${dayjs.utc(fecha).format('YYYYMMDD')}'`);
            return  res.send({
                type: "Succes",
                message: "",
                data: guides[0]
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getGuidesByDriverToReturn: async (req, res) => {
        try {
            const {chofer, fecha} = req.query;
            dayjs.extend(utc);
            let guides = await sequelize.query(`EXEC sp_GuiasChoferDevolucion '${chofer}', '${dayjs.utc(fecha).format('YYYYMMDD')}'`);
            return  res.send({
                type: "Succes",
                message: "",
                data: guides[0]
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getGuidesInTransit: async (req, res) => {
        try {
            let guides = await sequelize.query(`SELECT * FROM OrdenesRecoleccionGuias WHERE estatus in ('En Transito','En Transito A Devolver')`);
            return res.send({
                type: "Succes",
                message: "",
                data: guides[0]
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getGuidesDelivered: async (req, res) => {
        try {
            const { fechaIni, fechaFin } = req.query;
            let guides = await sequelize.query(`SELECT * FROM OrdenesRecoleccionGuias WHERE estatus = 'Entregada' AND RecibeFecha BETWEEN '${dayjs.utc(fechaIni).format('YYYYMMDD')}' AND '${dayjs.utc(fechaFin).format('YYYYMMDD')}'`);
            return res.send({
                type: "Succes",
                message: "",
                data: guides[0]
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getGuidesReturnedToCustomer: async (req, res) => {
        try {
            const { fechaIni, fechaFin } = req.query;
            let guides = await sequelize.query(`SELECT * FROM OrdenesRecoleccionGuias WHERE estatus = 'Devuelta a Cliente' AND RecibeFecha BETWEEN '${dayjs.utc(fechaIni).format('YYYYMMDD')}' AND '${dayjs.utc(fechaFin).format('YYYYMMDD')}'`);
            return res.send({
                type: "Succes",
                message: "",
                data: guides[0]
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getGuidesReturnToCustomers: async (req, res) => {
        try {
            let guides = await Guide.findAll({
                where: { estatus: 'Por Devolver a Cliente' }
            });
            return res.send({
                type: "Succes",
                message: "",
                data: guides
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getGuidesReturn: async (req, res) => {
        try {
            let guides = await Guide.findAll({
                where: { estatus: 'Devuelta a Chofer' }
            });
            return res.send({
                type: "Succes",
                message: "",
                data: guides
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    unassignGuide: async (req, res) => {
        try {
            const {
                guia
             } = req.body;
             await sequelize.query(`EXEC sp_EntregaDesasignarChofer '${guia}'`);
             return res.send({
                type: "Success",
                message: "La guia fue desasignada satisfactoriamente"
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    markGuideAsReturnToCustomerDirectly: async (req, res) => {
        try {
            const { guia } = req.body
            await sequelize.query(`            
            Update OrdenesRecoleccionGuias
            Set 
                estatus='Por Devolver a Cliente',
                fechaDevueltaAlmacen = (select GETDATE())
            Where guia='${guia}'
            `);
            return res.send({
                type: "Succes",
                message: "La guia fue marcada como devolucion a cliente exitosamente"
            })
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    deleteGuide: async (req, res) => {
        try {
            const { guia } = req.body

            await sequelize.query(`
                UPDATE OrdenesRecoleccion
                SET paquetes = paquetes - 1
                WHERE orden=(SELECT orden FROM OrdenesRecoleccionGuias WHERE guia='${guia}')
            `);

            await sequelize.query(`            
                UPDATE OrdenesRecoleccionGuias
                SET orden = NULL
                WHERE guia='${guia}'
            `);

            return res.send({
                type: "Succes",
                message: "La guia fue removida exitosamente"
            });

        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getGuidesByBranch: async (req, res) => {
        try {
            const { sucursal } = req.query;
            let guides = await sequelize.query(`SELECT * FROM OrdenesRecoleccionGuias WHERE sucursal = '${sucursal}' AND orden is NULL`);
            return res.send({
                type: "Succes",
                message: "",
                data: guides[0]
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    assignGuideToOrder: async (req, res) => {
        try {
            const {
                guia,
                orden
             } = req.body;

             await sequelize.query(`
                UPDATE OrdenesRecoleccionGuias 
                SET orden = '${orden.orden}'
                WHERE guia='${guia}'
            `);

            await sequelize.query(`
                UPDATE OrdenesRecoleccion
                SET paquetes = paquetes + 1
                WHERE orden='${orden.orden}'
            `);

             return res.send({
                type: "Success",
                message: "La guia fue asignada satisfactoriamente"
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    updateGuideAsCollected: async (req, res) => {
        try {
            dayjs.extend(utc);
            const { orden, guia, fecha }  = req.body;
            await sequelize.query(`EXEC sp_RecoleccionGuiasActualizar '${guia}','${dayjs.utc(fecha).local().format('YYYYMMDD HH:mm:ss')}'`);
            let guide = await Guide.findAll({
                where: { guia: guia }
            });
            return  res.send({
                type: "Succes",
                message: "Guia actualizada con exito",
                data: guide
            });
        } catch (error) {
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    trackHistory: async (req, res) => {
        try {
            const { tipo, valor} = req.body;
            let guias = [];
            
            switch (tipo) {
                case "1"://Historial de guias
                    guias = await Guide.findAll({
                        where: { guia: valor }
                    });
                    if (guias.length === 0) {
                        throw new Error("No se encontraron guias");
                    }
                    break;
                case "2":
                    guias = await Guide.findAll({
                        where: { numeroPedido: valor }
                    });
                    if (guias.length === 0) {
                        throw new Error("No se encontraron guias");
                    }
                    break;
                case "3":
                    guias = await Guide.findAll({
                        where: { orden: valor }
                    });
                    if (guias.length === 0) {
                        throw new Error("No se encontraron guias");
                    }
                    break;
                case "4":
                    let possibleStatus = {
                        Pendiente: `'Pendiente', 'Por recolectar'`,
                        Recolectada: `'Recolectada', 'Entregada a Almacen','Devuelta a Almacen'`,
                        EnTransito: `'En Transito'`,
                        Entregada: `'Entregada'`,
                        Fallido:`'Devuelta a Chofer','Por Devolver a Cliente','En Transito A Devolver','Devuelta a Cliente'`
                    };

                    guias = await sequelize.query(`
                        SELECT * FROM OrdenesRecoleccionGuias WHERE estatus in (${possibleStatus[valor]})
                    `, { type: sequelize.QueryTypes.SELECT });

                    if (guias.length === 0) {
                        throw new Error("No se encontraron guias");
                    }
                    break;
                default:
                    break;
            }
            return res.send({
                type: "Succes",
                message: "",
                data: guias
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    detailHistory: async (req, res) => {
        try {
            const { guia } = req.body;

            let guide = await Guide.findOne({
                where: { guia: guia }
            });

            let order = await Order.findOne({
                where: { orden: guide.orden }
            });

            let returns = await sequelize.query(`
                SELECT * FROM Devoluciones WHERE guia='${guia}'
                `, 
            { type: sequelize.QueryTypes.SELECT });

            let history = {
                guia: guide.guia,
                orden: guide.orden,
                detail: [
                    {
                        estatus: 'Pendiente',
                        fecha: guide.fechaEnvio,
                        chofer: null,
                        comentarios: null
                    },
                    {
                        estatus: 'Recolectada',
                        fecha: guide.fechaRecoleccion,
                        chofer: order ? order.choferRecoleccion : null,
                        comentarios: null
                    },
                    {
                        estatus: 'En Transito',
                        fecha: guide.FechaEntregaChofer,
                        chofer: guide.choferEntrega,
                        comentarios: null
                    },
                    {
                        estatus: 'Entregada',
                        fecha: guide.RecibeFecha,
                        chofer: guide.choferEntrega,
                        comentarios: null,
                        fotoIfe: guide.fotoIfe,
                        fotoCasa: guide.fotoCasa,
                        fotoOtro: guide.fotoOtro
                    }
                ]
            }

            if (returns.length > 0) {
                returns.forEach(element => {
                    history.detail.push({
                        estatus: 'Fallido',
                        fecha: element.fechaDevolucionTienda || element.fechaDevolucionAlmacen,
                        chofer: guide.choferEntrega,
                        comentarios: element.motivoDevolucion
                    });
                });
            }

            return res.send({
                type: "Succes",
                message: "",
                data: history
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