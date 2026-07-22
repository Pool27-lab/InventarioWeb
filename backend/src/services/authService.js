const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { buscarUsuarioPorUsuario, crearUsuario } = require("../models/usuarioModel");

async function login(usuario, password) {

    const usuarioEncontrado = await buscarUsuarioPorUsuario(usuario);

    if (!usuarioEncontrado) {
        throw new Error("Usuario o contraseña incorrectos");
    }

    if (!usuarioEncontrado.estado) {
        throw new Error("El usuario está inactivo");
    }

    const passwordCorrecta = await bcrypt.compare(
        password,
        usuarioEncontrado.password
    );

    if (!passwordCorrecta) {
        throw new Error("Usuario o contraseña incorrectos");
    }

    const token = jwt.sign(
        {
            id_usuario: usuarioEncontrado.id_usuario,
            usuario: usuarioEncontrado.usuario,
            rol: usuarioEncontrado.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    );

    return {
        usuario: {
            id_usuario: usuarioEncontrado.id_usuario,
            nombre: usuarioEncontrado.nombre,
            usuario: usuarioEncontrado.usuario,
            rol: usuarioEncontrado.rol
        },
        token
    };
}

async function registrarUsuario({ nombre, usuario, password }) {
    const usuarioExistente = await buscarUsuarioPorUsuario(usuario);

    if (usuarioExistente) {
        throw new Error("El usuario ya existe");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await crearUsuario({
        nombre,
        usuario,
        password: passwordHash,
        rol: "Usuario"
    });
}

module.exports = {
    login,
    registrarUsuario
};
