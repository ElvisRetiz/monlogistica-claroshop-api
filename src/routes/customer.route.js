const express = require('express');
const controller = require('../controllers/customer.controller');

const router = express.Router();

router.get("/",controller.getCustomers);
router.get("/:cliente",controller.getCustomer);
router.post("/",controller.createCustomer);
router.delete("/eliminar",controller.deleteCustomer);

module.exports = router;