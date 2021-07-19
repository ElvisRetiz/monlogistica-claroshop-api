const express = require('express');
const controller = require('../controllers/auth.controller');

const router = express.Router();

router.post("/login",controller.logIn);
router.post("/logout",controller.signOff);

module.exports = router;