const { pool } = require("../config/database");


// Obtener clientes
async function obtenerClientes() {

    const [rows] = await pool().query(`
        SELECT *
        FROM Clientes
        ORDER BY id_cliente DESC
    `);

    return rows;

}


// Registrar cliente
async function registrarCliente(cliente) {

    const [result] = await pool().query(
        `
        INSERT INTO Clientes
        (
            nombre,
            telefono,
            direccion
        )
        VALUES (?, ?, ?)
        `,
        [
            cliente.nombre,
            cliente.telefono,
            cliente.direccion
        ]
    );


    return {
        id_cliente: result.insertId,
        ...cliente
    };

}


module.exports = {

    obtenerClientes,
    registrarCliente

};