const express = require('express');
const controller = require('../controllers/warehouse.controller');

const router = express.Router();

router.get("/",controller.getWarehouses);
router.get("/:almacen",controller.getWarehouse);
router.post("/",controller.createWarehouse);
router.delete("/eliminar",controller.deleteWarehouse);

module.exports = router;