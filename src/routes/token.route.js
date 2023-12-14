const express = require('express');
const controller = require('../controllers/token.contreller');

const router = express.Router();

router.post('/cotizar-paquete', controller.generateToken);
router.post('/generar-guia', controller.generateGuide);
router.post('/actualizar-guia', controller.updateGuide);

module.exports = router;