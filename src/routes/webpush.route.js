const express = require('express');
const controller = require('../controllers/webpush.controller');

const router = express.Router();

router.post("/subscription",controller.suscribeUser);
router.post("/new-message",controller.sendNotification);

module.exports = router;