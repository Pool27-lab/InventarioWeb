const ventaService = require("../services/ventaService");


// Registrar venta
async function registrarVenta(req, res) {

    try {


        const resultado = await ventaService.crearVenta(req.body);


        res.status(201).json(resultado);



    } catch (error) {


        res.status(400).json({

            mensaje: error.message

        });


    }

}



module.exports = {

    registrarVenta

};