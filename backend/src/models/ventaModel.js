const { pool } = require("../config/database");


// Registrar venta
async function registrarVenta(venta) {


    const [result] = await pool().query(
        `
        INSERT INTO Ventas
        (
            total,
            id_cliente,
            id_usuario
        )

        VALUES (?, ?, ?)

        `,
        [
            venta.total,
            venta.id_cliente,
            venta.id_usuario
        ]
    );


    return {
        id_venta: result.insertId
    };

}



// Registrar detalle
async function registrarDetalle(detalle) {


    await pool().query(
        `
        INSERT INTO DetalleVenta
        (
            id_venta,
            id_producto,
            cantidad,
            precio,
            subtotal
        )

        VALUES (?, ?, ?, ?, ?)

        `,
        [
            detalle.id_venta,
            detalle.id_producto,
            detalle.cantidad,
            detalle.precio,
            detalle.subtotal
        ]
    );

}



// Obtener producto
async function obtenerProducto(id_producto) {


    const [rows] = await pool().query(
        `
        SELECT
            id_producto,
            nombre,
            precio,
            stock

        FROM Productos

        WHERE id_producto = ?

        `,
        [id_producto]
    );


    return rows[0];

}



// Actualizar stock
async function actualizarStock(id_producto, stock) {


    await pool().query(
        `
        UPDATE Productos

        SET stock = ?

        WHERE id_producto = ?

        `,
        [
            stock,
            id_producto
        ]
    );

}



module.exports = {

    registrarVenta,
    registrarDetalle,
    obtenerProducto,
    actualizarStock

};