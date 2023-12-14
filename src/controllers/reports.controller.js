const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const sequelize = require('../db/index');

dayjs.extend(utc)

const controller = {
    getReporteDevolucionATienda: async (req, res) => {
        try {
            const { iniFecha, finFecha } = req.query;
            let report = await sequelize.query(`EXEC sp_RepDevolucionATienda '${dayjs.utc(iniFecha).format('YYYYMMDD')} 00:01:00', '${dayjs.utc(finFecha).format('YYYYMMDD')} 23:59:00'`);
            return  res.send({
                type: "Succes",
                message: "",
                data: report[0]
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getReportDeTiempos: async (req, res) => {
        try {
            const { iniFecha, finFecha } = req.query;
            let report = await sequelize.query(`EXEC sp_RepDeTiempos '${dayjs.utc(iniFecha).format('YYYYMMDD')}  00:01:00', '${dayjs.utc(finFecha).format('YYYYMMDD')} 23:59:00'`);
            console.log(report[0]);
            return  res.send({
                type: "Succes",
                message: "",
                data: report[0]
            });
        } catch (error) {
            console.log(error);
            return  res.send({
                type: "Error",
                message: error.message
            });
        }
    },
    getRepControlDeServiciosClaroShop: async (req, res) => {
        try {
            const {fechaIni, fechaFin} = req.query;
            
            let report = await sequelize.query(`EXEC sp_RepControlDeServicios '${dayjs.utc(fechaIni).format('YYYYMMDD')}  00:01:00','${dayjs.utc(fechaFin).format('YYYYMMDD')} 23:59:00'`, { type: sequelize.QueryTypes.SELECT });
            
            let returns = await sequelize.query(`SELECT * FROM Devoluciones WHERE fechaDevolucionAlmacen BETWEEN '${dayjs.utc(fechaIni).format('YYYYMMDD')}  00:01:00' AND '${dayjs.utc(fechaFin).format('YYYYMMDD')} 23:59:00'`, { type: sequelize.QueryTypes.SELECT });

            let newReport = [];

            returns.forEach(devolucion => { 
                report.forEach(reporte => {
                    if(reporte.guia == devolucion.guia){
                        newReport.push({
                            choferRecolecta: null,
                            fechaRecoleccion: null,
                            tienda: reporte.tienda,
                            origen: reporte.origen,
                            destino: reporte.destino,
                            codigoPostal: reporte.codigoPostal,
                            municipio: reporte.municipio,
                            numeroPedido: reporte.numeroPedido,
                            guia: devolucion.guia,
                            choferEntrega: reporte.choferEntrega,
                            fechaEntrega: 'FALLIDO',
                            comentarios: devolucion.motivoDevolucion
                        });
                    }
                });
            });

            let completeReport = report.concat(newReport).sort((a, b) => (a.guia > b.guia) ? 1 : -1);

            return  res.send({
                type: "Succes",
                message: "",
                data: completeReport
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