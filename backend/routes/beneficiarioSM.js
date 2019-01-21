const controlador = require('../controllers/beneficiarioSM')
const express = require('express');
const router = express.Router();

router.get('/nombre', controlador.consultarNombreBeneficiarioSM);

router.get('/atender', controlador.consultarAtenderPorServicioSM);

router.get('/', controlador.consultarBeneficiarioSM);
//router.post('/',);

module.exports = router;
