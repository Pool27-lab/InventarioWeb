const { pool } = require("../config/database");


// Obtener productos
async function obtenerProductos() {


    const [rows] = await pool().query(`

        SELECT
            p.id_producto,
            p.codigo,
            p.nombre,
            p.descripcion,
            p.precio,
            p.stock,
            p.stock_minimo,
            c.nombre AS categoria,
            p.estado

        FROM Productos p

        INNER JOIN Categorias c
            ON p.id_categoria = c.id_categoria

        WHERE p.estado = 1

        ORDER BY p.id_producto

    `);


    return rows;

}



// Buscar producto
async function buscarProductoPorCodigo(codigo) {


    const [rows] = await pool().query(
        `
        SELECT id_producto

        FROM Productos

        WHERE codigo = ?
        `,
        [codigo]
    );


    return rows[0];

}



// Crear producto
async function crearProducto(producto) {


    await pool().query(
        `
        INSERT INTO Productos
        (
            codigo,
            nombre,
            descripcion,
            precio,
            stock,
            stock_minimo,
            id_categoria
        )

        VALUES (?, ?, ?, ?, ?, ?, ?)

        `,
        [
            producto.codigo,
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.stock,
            producto.stock_minimo,
            producto.id_categoria
        ]
    );

}



// Actualizar producto
async function actualizarProducto(id, producto) {


    await pool().query(
        `
        UPDATE Productos

        SET

        codigo = IFNULL(?, codigo),
        nombre = IFNULL(?, nombre),
        descripcion = IFNULL(?, descripcion),
        precio = IFNULL(?, precio),
        stock = IFNULL(?, stock),
        stock_minimo = IFNULL(?, stock_minimo),
        id_categoria = IFNULL(?, id_categoria)


        WHERE id_producto = ?

        `,
        [
            producto.codigo,
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.stock,
            producto.stock_minimo,
            producto.id_categoria,
            id
        ]
    );

}



// Eliminar lógico
async function eliminarProducto(id) {


    await pool().query(
        `
        UPDATE Productos

        SET estado = 0

        WHERE id_producto = ?

        `,
        [id]
    );

}



module.exports = {

    obtenerProductos,
    buscarProductoPorCodigo,
    crearProducto,
    actualizarProducto,
    eliminarProducto

};