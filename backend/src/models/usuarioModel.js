const { pool } = require("../config/database");

async function buscarUsuarioPorUsuario(usuario) {
    const [rows] = await pool().query(
        `SELECT
            id_usuario,
            nombre,
            usuario,
            password,
            rol,
            estado
        FROM Usuarios
        WHERE usuario = ?`,
        [usuario]
    );

    return rows[0];
}

async function crearUsuario(usuario) {
    await pool().query(
        `INSERT INTO Usuarios (
            nombre,
            usuario,
            password,
            rol
        ) VALUES (?, ?, ?, ?)`,
        [usuario.nombre, usuario.usuario, usuario.password, usuario.rol]
    );
}

module.exports = {
    buscarUsuarioPorUsuario,
    crearUsuario
};
