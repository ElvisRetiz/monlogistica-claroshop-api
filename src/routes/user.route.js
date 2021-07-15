const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.get("/usuarios",controller.getUsers);
router.post("/usuarios",controller.createUser);

module.exports = router;