const express = require('express');
const controller = require('../controllers/parameters.controller');

const router = express.Router();

router.get("/",controller.getParameters);
router.put("/",controller.updateParameters);
router.post("/update-limit",controller.updateLimit);

module.exports = router;