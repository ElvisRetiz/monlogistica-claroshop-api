const express = require('express');
const controller = require('../controllers/area.controller');

const router = express.Router();

router.get("/",controller.getAreas);
router.get("/:area",controller.getArea);
router.post("/",controller.createArea);
router.delete("/eliminar",controller.deleteArea);

module.exports = router;