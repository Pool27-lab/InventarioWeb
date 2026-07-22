const {
    obtenerCategorias,
    crearCategoria,
    buscarCategoriaPorNombre,
    actualizarCategoria,
    eliminarCategoria
} = require("../models/categoriaModel");

// Listar categorías
async function listarCategorias() {
    return await obtenerCategorias();
}

// Registrar categoría
async function registrarCategoria(nombre, descripcion) {

    const categoriaExiste = await buscarCategoriaPorNombre(nombre);

    if (categoriaExiste) {
        throw new Error("Ya existe una categoría con ese nombre");
    }

    await crearCategoria(nombre, descripcion);
}

async function modificarCategoria(id, nombre, descripcion) {

    await actualizarCategoria(id, nombre, descripcion);

}

async function borrarCategoria(id) {

    await eliminarCategoria(id);

}

module.exports = {
    listarCategorias,
    registrarCategoria,
    modificarCategoria,
    borrarCategoria
};