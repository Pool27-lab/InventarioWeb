const express = require("express");

const router = express.Router();

const clienteController = require("../controllers/clienteController");


// Obtener todos los clientes
router.get(
    "/",
    clienteController.obtenerClientes
);


// Registrar cliente
router.post(
    "/",
    clienteController.registrarCliente
);



module.exports = router;