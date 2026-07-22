const { connectDB, pool } = require("../config/database");

async function obtenerDashboard(req, res) {
    try {

        // Asegura que exista la conexión
        await connectDB();

        const [productos] = await pool().query(
            "SELECT COUNT(*) AS total FROM Productos"
        );

        const [clientes] = await pool().query(
            "SELECT COUNT(*) AS total FROM Clientes"
        );

        const [ventas] = await pool().query(
            "SELECT COUNT(*) AS total FROM Ventas"
        );

        const [stock] = await pool().query(
            "SELECT SUM(stock) AS total FROM Productos"
        );

        res.json({
            productos: productos[0].total,
            clientes: clientes[0].total,
            ventas: ventas[0].total,
            stock: stock[0].total || 0
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });

    }
}

module.exports = {
    obtenerDashboard
};