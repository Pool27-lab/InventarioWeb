const { login, registrarUsuario: registrarUsuarioService } = require("../services/authService");

async function iniciarSesion(req, res) {

    try {

        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({
                mensaje: "El usuario y la contraseña son obligatorios"
            });
        }

        const resultado = await login(usuario, password);

        res.status(200).json({
            mensaje: "Login exitoso",
            ...resultado
        });

    } catch (error) {

        console.error("Error en login:", error.message);

        res.status(401).json({
            mensaje: error.message
        });
    }
}

async function registrarUsuario(req, res) {
    try {
        const { nombre, usuario, password, confirmarPassword } = req.body;

        if (!nombre || !usuario || !password || !confirmarPassword) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        if (password !== confirmarPassword) {
            return res.status(400).json({
                mensaje: "Las contraseñas no coinciden"
            });
        }

        await registrarUsuarioService({ nombre, usuario, password });

        res.status(201).json({
            mensaje: "Usuario registrado correctamente"
        });
    } catch (error) {
        console.error("Error en registro:", error.message);

        if (error.message === "El usuario ya existe") {
            return res.status(400).json({ mensaje: error.message });
        }

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
}

module.exports = {
    iniciarSesion,
    registrarUsuario
};
