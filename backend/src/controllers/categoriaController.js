const {
    listarCategorias,
    registrarCategoria,
    modificarCategoria,
    borrarCategoria
} = require("../services/categoriaService");

// Obtener todas las categorías
async function obtenerTodas(req, res) {
    try {
        const categorias = await listarCategorias();

        res.status(200).json(categorias);

    } catch (error) {

        console.error("ERROR CATEGORIAS:");
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener las categorías",
            error: error.message
        });
    }
}

// Crear una categoría
async function crear(req, res) {

    try {

        const { nombre, descripcion } = req.body;

        if (!nombre) {
            return res.status(400).json({
                mensaje: "El nombre es obligatorio"
            });
        }

        await registrarCategoria(nombre, descripcion);

        res.status(201).json({
            mensaje: "Categoría registrada correctamente"
        });

    } catch (error) {

    if (error.message === "Ya existe una categoría con ese nombre") {
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
// Actualizar categoría
async function actualizar(req, res) {

    try {

        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        await modificarCategoria(id, nombre, descripcion);

        res.json({
            mensaje: "Categoría actualizada correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });

    }

}

// Eliminar categoría (lógico)
async function eliminar(req, res) {

    try {

        const { id } = req.params;

        await borrarCategoria(id);

        res.json({
            mensaje: "Categoría eliminada correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });

    }

}

module.exports = {
    obtenerTodas,
    crear,
    actualizar,
    eliminar
};