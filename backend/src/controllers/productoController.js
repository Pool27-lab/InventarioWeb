const {
    listarProductos,
    registrarProducto,
    editarProducto,
    borrarProducto
} = require("../services/productoService");

// Obtener todos los productos
async function obtenerTodos(req, res) {

    try {

        const productos = await listarProductos();

        res.status(200).json(productos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener los productos"
        });

    }

}

// Crear producto
async function crear(req, res) {

    try {

        const {
            codigo,
            nombre,
            descripcion,
            precio,
            stock,
            stock_minimo,
            id_categoria
        } = req.body;

        if (
            !codigo ||
            !nombre ||
            precio == null ||
            stock == null ||
            stock_minimo == null ||
            !id_categoria
        ) {
            return res.status(400).json({
                mensaje: "Todos los campos obligatorios deben ser enviados"
            });
        }

        await registrarProducto({
            codigo,
            nombre,
            descripcion,
            precio,
            stock,
            stock_minimo,
            id_categoria
        });

        res.status(201).json({
            mensaje: "Producto registrado correctamente"
        });

    } catch (error) {

        if (error.message === "Ya existe un producto con ese código") {

            return res.status(400).json({
                mensaje: error.message
            });

        }

        console.error(error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });

    }

}
// Actualizar producto
async function actualizar(req, res) {

    try {

        const id = req.params.id;

        await editarProducto(id, req.body);

        res.status(200).json({
            mensaje: "Producto actualizado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar el producto"
        });

    }

}
// Eliminar producto (lógico)
async function eliminar(req, res) {

    try {

        const id = req.params.id;

        await borrarProducto(id);

        res.status(200).json({
            mensaje: "Producto eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al eliminar el producto"
        });

    }

}

module.exports = {
    obtenerTodos,
    crear,
    actualizar,
    eliminar
};