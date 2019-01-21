const controlador = require('../controllers/beneficiarioSM')
const express = require('express');
const router = express.Router();

router.post('/filtrar', controlador.filtrarBeneficiarioSM);

router.get('/', controlador.consultarBeneficiarioSM);
//router.post('/',);

module.exports = router;
