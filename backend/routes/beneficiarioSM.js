const controlador = require('../controllers/beneficiarioSM')
const express = require('express');
const router = express.Router();

router.post('/', controlador.ingresarBeneficiarioSM);

router.post('/filtrar', controlador.filtrarBeneficiarioSM);

router.post('/todos', controlador.filtrarBeneficiario);

router.get('/', controlador.consultarBeneficiarioSM);
//router.post('/',);

router.get('/provincia', controlador.consultarProvincia);

router.get('/canton/:id', controlador.consultarCanton);

router.get('/parroquia/:id', controlador.consultarParroquia);

module.exports = router;
