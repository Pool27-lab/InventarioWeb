const { pool } = require("../config/database");

// Obtener todas las categorías
async function obtenerCategorias() {

    const [rows] = await pool().query(`
        SELECT
            id_categoria,
            nombre,
            descripcion,
            estado,
            fecha_registro
        FROM Categorias
        ORDER BY id_categoria
    `);

    return rows;
}


// Crear categoría
async function crearCategoria(nombre, descripcion) {

    await pool().query(
        `
        INSERT INTO Categorias
        (
            nombre,
            descripcion
        )
        VALUES (?, ?)
        `,
        [nombre, descripcion]
    );

}


// Buscar categoría por nombre
async function buscarCategoriaPorNombre(nombre) {

    const [rows] = await pool().query(
        `
        SELECT id_categoria
        FROM Categorias
        WHERE nombre = ?
        `,
        [nombre]
    );

    return rows[0];

}


// Actualizar categoría
async function actualizarCategoria(id, nombre, descripcion) {

    await pool().query(
        `
        UPDATE Categorias
        SET
            nombre = ?,
            descripcion = ?
        WHERE id_categoria = ?
        `,
        [nombre, descripcion, id]
    );

}


// Eliminación lógica
async function eliminarCategoria(id) {

    await pool().query(
        `
        UPDATE Categorias
        SET estado = 0
        WHERE id_categoria = ?
        `,
        [id]
    );

}


module.exports = {
    obtenerCategorias,
    crearCategoria,
    buscarCategoriaPorNombre,
    actualizarCategoria,
    eliminarCategoria
};