const movimientoService = require("../services/movimientoService");


// Obtener todos los movimientos
async function obtenerMovimientos(req, res) {

    try {

        const movimientos = await movimientoService.listarMovimientos();

        res.json(movimientos);


    } catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

}



// Registrar movimiento
async function registrarMovimiento(req, res) {

    try {


        const resultado = await movimientoService.crearMovimiento(req.body);


        res.status(201).json(resultado);



    } catch (error) {


        res.status(400).json({

            mensaje: error.message

        });


    }

}



module.exports = {

    obtenerMovimientos,

    registrarMovimiento

};