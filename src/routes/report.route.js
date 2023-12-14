const express = require('express');
const controller = require('../controllers/reports.controller');

const router = express.Router();

router.get("/control", controller.getRepControlDeServiciosClaroShop);
router.get("/tiempos", controller.getReportDeTiempos);
router.get("/devoluciones", controller.getReporteDevolucionATienda);

module.exports = router;