const express = require('express');
const controller = require('../controllers/areaCP.controller');

const router = express.Router();

router.get("/",controller.getAreasCP);
router.get("/cparea/:area",controller.getCPByArea);
router.get("/areacp/:codigopostal",controller.getAreaByCP);
router.post("/",controller.createAreaCP);
router.delete("/eliminar",controller.deleteAreaCP);

module.exports = router;