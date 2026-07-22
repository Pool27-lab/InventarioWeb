const {
    obtenerProductos,
    crearProducto,
    buscarProductoPorCodigo,
    actualizarProducto,
    eliminarProducto
} = require("../models/productoModel");

// Listar productos
async function listarProductos() {
    return await obtenerProductos();
}

// Registrar producto
async function registrarProducto(producto) {

    const productoExiste = await buscarProductoPorCodigo(producto.codigo);

    if (productoExiste) {
        throw new Error("Ya existe un producto con ese código");
    }

    await crearProducto(producto);
}
// Actualizar producto
async function editarProducto(id, producto) {

    await actualizarProducto(id, producto);

}

// Eliminar producto
async function borrarProducto(id) {
    await eliminarProducto(id);
}

module.exports = {
    listarProductos,
    registrarProducto,
    editarProducto,
    borrarProducto
};