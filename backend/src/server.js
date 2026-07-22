const app = require("./app");
const { connectDB } = require("./config/database");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    });
}

iniciarServidor();