const express = require("express");

const {
    obtenerTodos,
    crear,
    actualizar,
    eliminar
} = require("../controllers/productoController");

const router = express.Router();

router.get("/", obtenerTodos);

router.post("/", crear);

router.put("/:id", actualizar);

router.delete("/:id", eliminar);

module.exports = router;