const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const path = require("path");



const authRoutes = require("./routes/authRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const productoRoutes = require("./routes/productoRoutes");
const movimientoRoutes = require("./routes/movimientoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const ventaRoutes = require("./routes/ventaRoutes");

const dashboardRoutes =
require("./routes/dashboardRoutes");

const app = express();


app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Ruta principal


// Rutas de autenticación
app.use("/api/auth", authRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/movimientos", movimientoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/ventas", ventaRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"../public/index.html")
    );
});
module.exports = app;