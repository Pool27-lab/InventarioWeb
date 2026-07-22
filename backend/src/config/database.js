const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

let pool;

async function connectDB() {
    try {
        pool = await mysql.createPool(config);

        await pool.getConnection();

        console.log("✅ Conectado a MySQL");

        return pool;
    } catch (error) {
        console.error("❌ Error de conexión:", error.message);
        throw error;
    }
}

module.exports = {
    connectDB,
    pool: () => pool
};