const movimientoModel = require("../models/movimientoModel");


// Listar movimientos
async function listarMovimientos() {

    const movimientos = await movimientoModel.obtenerMovimientos();

    return movimientos;

}



// Crear movimiento y actualizar stock automáticamente
async function crearMovimiento(data) {


    const {
        tipo,
        cantidad,
        observacion,
        id_producto,
        id_usuario

    } = data;



    // Validaciones

    if (!tipo || !cantidad || !id_producto || !id_usuario) {

        throw new Error("Faltan datos obligatorios");

    }



    if (cantidad <= 0) {

        throw new Error("La cantidad debe ser mayor a cero");

    }



    // Buscar producto

    const producto = await movimientoModel.obtenerProductoPorId(id_producto);



    if (!producto) {

        throw new Error("Producto no encontrado");

    }



    let nuevoStock;



    // Movimiento de entrada

    if (tipo === "ENTRADA") {


        nuevoStock = producto.stock + cantidad;


    }



    // Movimiento de salida

    else if (tipo === "SALIDA") {



        if (producto.stock < cantidad) {


            throw new Error("Stock insuficiente");


        }



        nuevoStock = producto.stock - cantidad;


    }



    else {


        throw new Error(
            "Tipo de movimiento inválido"
        );


    }




    // Registrar movimiento

    await movimientoModel.registrarMovimiento({

        tipo,
        cantidad,
        observacion,
        id_producto,
        id_usuario

    });



    // Actualizar stock

    await movimientoModel.actualizarStock(

        id_producto,

        nuevoStock

    );



    return {

        mensaje: "Movimiento registrado correctamente",

        stock_anterior: producto.stock,

        stock_actual: nuevoStock

    };


}



module.exports = {

    listarMovimientos,

    crearMovimiento

};