const express = require("express");
const { iniciarSesion, registrarUsuario } = require("../controllers/authController");

const router = express.Router();

router.post("/login", iniciarSesion);
router.post("/register", registrarUsuario);

module.exports = router;
