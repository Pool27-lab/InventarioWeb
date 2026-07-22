const express = require("express");

const router = express.Router();

const movimientoController = require("../controllers/movimientoController");


// Obtener todos los movimientos
router.get(
    "/",
    movimientoController.obtenerMovimientos
);


// Registrar movimiento
router.post(
    "/",
    movimientoController.registrarMovimiento
);



module.exports = router;