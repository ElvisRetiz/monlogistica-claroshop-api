const express = require('express');
const controller = require('../controllers/adress.controller');

const router = express.Router();

router.get("/",controller.getAdresses);
router.get("/:cliente",controller.getAdress);
router.post("/",controller.createAdress);
router.delete("/eliminar",controller.deleteAdress);

module.exports = router;