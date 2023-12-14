const express = require('express');
const controller = require('../controllers/zone.controller');

const router = express.Router();

router.get("/",controller.getZones);
router.get("/:zona",controller.getZone);
router.post("/",controller.createZone);
router.delete("/eliminar",controller.deleteZone);

module.exports = router;