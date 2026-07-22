const express = require("express");

const router = express.Router();

const ventaController = require("../controllers/ventaController");


// Registrar venta
router.post(
    "/",
    ventaController.registrarVenta
);


module.exports = router;