const controlador = require('../controllers/citaSM')
const express = require('express');
const router = express.Router();

router.get('/atender', controlador.consultarAtenderPorServicioSM);

router.get('/servicio', controlador.consultarServiciosSM);

module.exports = router;
