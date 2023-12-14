const express = require('express');
const controller = require('../controllers/order.controller');

const router = express.Router();

router.get("/",controller.getOrders);
router.get("/pendientes",controller.getOrdersPendingToBeAssigned);
router.get("/:orden",controller.getOrder);
router.get("/asignadas/all",controller.getAssignedOrders);
router.get("/asignadas/all/:chofer",controller.getAssignedOrdersByDriver);
router.get("/recolectadas/all",controller.getCollectedOrders);
router.get("/almacen/all",controller.getInWarehouseOrders);
router.post("/",controller.createOrder);
router.post("/asignar",controller.assignOrder);
router.post("/desasignar",controller.unassignOrder);
router.post("/marcar/recolectada",controller.markOrderAsCollected);
router.delete("/eliminar",controller.deleteOrder);

module.exports = router;