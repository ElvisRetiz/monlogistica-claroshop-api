const express = require('express');
const controller = require('../controllers/order.controller');

const router = express.Router();

router.get("/",controller.getOrders);
router.get("/pendientes",controller.getOrdersPendingToBeAssigned);
router.get("/:orden",controller.getOrder);
router.get("/asignadas/:chofer",controller.getAssignedOrders);
router.post("/",controller.createOrder);
router.delete("/eliminar",controller.deleteOrder);

module.exports = router;