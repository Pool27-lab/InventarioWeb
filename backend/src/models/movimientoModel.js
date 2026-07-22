const { pool } = require("../config/database");


// Obtener movimientos
async function obtenerMovimientos() {


    const [rows] = await pool().query(`
        SELECT
            m.id_movimiento,
            m.tipo,
            m.fecha,
            m.cantidad,
            m.observacion,
            p.nombre AS producto,
            u.nombre AS usuario

        FROM Movimientos m

        INNER JOIN Productos p
            ON m.id_producto = p.id_producto

        INNER JOIN Usuarios u
            ON m.id_usuario = u.id_usuario

        ORDER BY m.fecha DESC
    `);


    return rows;

}



// Obtener producto
async function obtenerProductoPorId(idProducto) {


    const [rows] = await pool().query(
        `
        SELECT
            id_producto,
            stock

        FROM Productos

        WHERE id_producto = ?
        `,
        [idProducto]
    );


    return rows[0];

}



// Registrar movimiento
async function registrarMovimiento(movimiento) {


    await pool().query(
        `
        INSERT INTO Movimientos
        (
            tipo,
            cantidad,
            observacion,
            id_producto,
            id_usuario
        )

        VALUES (?, ?, ?, ?, ?)
        `,
        [
            movimiento.tipo,
            movimiento.cantidad,
            movimiento.observacion,
            movimiento.id_producto,
            movimiento.id_usuario
        ]
    );

}



// Actualizar stock
async function actualizarStock(idProducto, nuevoStock) {


    await pool().query(
        `
        UPDATE Productos

        SET stock = ?

        WHERE id_producto = ?
        `,
        [
            nuevoStock,
            idProducto
        ]
    );

}



module.exports = {

    obtenerMovimientos,
    obtenerProductoPorId,
    registrarMovimiento,
    actualizarStock

};