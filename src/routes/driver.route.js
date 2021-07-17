const express = require('express');
const controller = require('../controllers/driver.controller');

const router = express.Router();

router.get("/", controller.getDrivers);
router.get("/:chofer",controller.getDriver);
router.post("/",controller.createDriver);
router.delete("/eliminar",controller.deleteDriver);

module.exports = router;