const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.get("/",controller.getUsers);
router.get("/:usuario",controller.getUser);
router.post("/",controller.createUser);
router.delete("/eliminar",controller.deleteUser);

module.exports = router;