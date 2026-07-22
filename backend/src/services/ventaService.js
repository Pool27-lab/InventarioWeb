const ventaModel = require("../models/ventaModel");

const movimientoModel = require("../models/movimientoModel");


// Registrar venta completa
async function crearVenta(data) {


    const {
        id_cliente,
        id_usuario,
        productos
    } = data;



    if (!id_cliente || !id_usuario || !productos || productos.length === 0) {

        throw new Error("Datos incompletos para registrar venta");

    }



    let total = 0;

    let detalles = [];



    // Validar productos y calcular total

    for (const item of productos) {


        const producto = await ventaModel.obtenerProducto(
            item.id_producto
        );



        if (!producto) {

            throw new Error(
                "Producto no encontrado"
            );

        }



        if (producto.stock < item.cantidad) {

            throw new Error(
                `Stock insuficiente para ${producto.nombre}`
            );

        }



        const subtotal =
            producto.precio * item.cantidad;



        total += subtotal;



        detalles.push({

            id_producto: producto.id_producto,

            cantidad: item.cantidad,

            precio: producto.precio,

            subtotal

        });


    }



    // Registrar venta

    const venta = await ventaModel.registrarVenta({

        total,

        id_cliente,

        id_usuario

    });



    // Registrar detalles y actualizar stock

    for (const detalle of detalles) {



        await ventaModel.registrarDetalle({

            id_venta: venta.id_venta,

            ...detalle

        });



        const producto =
            await ventaModel.obtenerProducto(
                detalle.id_producto
            );



        const nuevoStock =
            producto.stock - detalle.cantidad;



        await ventaModel.actualizarStock(

            detalle.id_producto,

            nuevoStock

        );



        // Registrar movimiento salida

        await movimientoModel.registrarMovimiento({

            tipo:"SALIDA",

            cantidad:detalle.cantidad,

            observacion:"Venta registrada",

            id_producto:detalle.id_producto,

            id_usuario

        });


    }



    return {

        mensaje:"Venta registrada correctamente",

        id_venta:venta.id_venta,

        total

    };


}



module.exports = {

    crearVenta

};