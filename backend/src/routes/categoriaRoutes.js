const express = require("express");

const {
    obtenerTodas,
    crear,
    actualizar,
    eliminar
} = require("../controllers/categoriaController");

const router = express.Router();

router.get("/", obtenerTodas);

router.post("/", crear);

router.put("/:id", actualizar);

router.delete("/:id", eliminar);

module.exports = router;