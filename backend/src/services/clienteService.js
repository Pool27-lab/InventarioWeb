const clienteModel = require("../models/clienteModel");


// Listar clientes
async function listarClientes() {

    const clientes = await clienteModel.obtenerClientes();

    return clientes;

}



// Crear cliente
async function crearCliente(data) {


    const {
        nombre,
        telefono,
        direccion
    } = data;



    // Validaciones

    if (!nombre) {

        throw new Error("El nombre del cliente es obligatorio");

    }



    if (nombre.length < 3) {

        throw new Error("El nombre debe tener mínimo 3 caracteres");

    }



    // Registrar cliente

    const cliente = await clienteModel.registrarCliente({

        nombre,
        telefono,
        direccion

    });



    return {

        mensaje: "Cliente registrado correctamente",

        cliente

    };


}



module.exports = {

    listarClientes,

    crearCliente

};