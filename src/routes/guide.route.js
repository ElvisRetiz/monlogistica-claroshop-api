const express = require('express');
const controller = require('../controllers/guide.controller');

const router = express.Router();

router.get("/",controller.getGuides);
router.get("/:orden",controller.getGuidesByOrder);
router.post("/recolectada",controller.markGuidesAsCollected);
router.post("/entregada",controller.markGuideAsDelivered);

module.exports = router;