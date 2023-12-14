const express = require('express');
const controller = require('../controllers/guide.controller');

const router = express.Router();

router.get("/",controller.getGuides);
router.get("/:orden",controller.getGuidesByOrder);
router.get("/consulta/guia",controller.getGuide);
router.get("/consulta/guias/por-recolectar",controller.getGuidesToCollect);
router.get("/consulta/guias/por-sucursal",controller.getGuidesByBranch);
router.get("/consulta/guias/recolectadas",controller.getCollectedGuides);
router.get("/consulta/guias/recolectadas-all",controller.getAllCollectedGuides);
router.get("/consulta/guias/chofer",controller.getGuidesByDriver);
router.get("/consulta/guias/chofer-devolucion",controller.getGuidesByDriverToReturn);
router.get("/consulta/guias/entransito",controller.getGuidesInTransit);
router.get("/consulta/guias/entregadas",controller.getGuidesDelivered);
router.get("/consulta/guias/devolucion",controller.getGuidesReturnToCustomers);
router.get("/consulta/guias/devolucion-cliente",controller.getGuidesReturn);
router.get("/consulta/guias/devolucion-final",controller.getGuidesReturnedToCustomer);
router.get("/consulta/reporte/guiasxarea/:almacen",controller.guideReport);
router.post("/consulta/guias/historial/general",controller.trackHistory);
router.post("/consulta/guias/historial/detalle",controller.detailHistory);
router.post("/asignar-guia-a-orden",controller.assignGuideToOrder);
router.post("/recolectada",controller.updateGuideAsCollected);
router.post("/asignada",controller.assignGuideToDriver);
router.post("/asignada-devolucion",controller.assignGuideToDriverToReturn);
router.post("/almacen",controller.deliveryGuideToWarehouse);
router.post("/entregada",controller.markGuideAsDelivered);
router.post("/desasignar",controller.unassignGuide);
router.post("/devuelta-cliente",controller.markGuideAsReturnToCustomer);
router.post("/devolucion",controller.markGuideToReturn);
router.post("/almacen-devolucion",controller.returnGuideToWarehouse);
router.post("/almacen-devolucion-directa",controller.markGuideAsReturnToCustomerDirectly);
router.delete("/",controller.deleteGuide);

module.exports = router;