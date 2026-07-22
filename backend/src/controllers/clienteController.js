const clienteService = require("../services/clienteService");


// Obtener todos los clientes
async function obtenerClientes(req, res) {

    try {

        const clientes = await clienteService.listarClientes();

        res.json(clientes);


    } catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

}



// Registrar cliente
async function registrarCliente(req, res) {

    try {


        const resultado = await clienteService.crearCliente(req.body);


        res.status(201).json(resultado);



    } catch (error) {


        res.status(400).json({

            mensaje: error.message

        });


    }

}



module.exports = {

    obtenerClientes,

    registrarCliente

};