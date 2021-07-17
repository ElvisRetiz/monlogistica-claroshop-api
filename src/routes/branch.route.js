const express = require('express');
const controller = require('../controllers/branch.controller');

const router = express.Router();

router.get("/",controller.getBranches);
router.get("/:sucursal", controller.getBranch);
router.post("/",controller.createBranch);

module.exports = router;