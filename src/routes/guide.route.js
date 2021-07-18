const express = require('express');
const controller = require('../controllers/guide.controller');

const router = express.Router();

router.get("/",controller.getGuides);
router.get("/:orden",controller.getGuidesByOrder);

module.exports = router;