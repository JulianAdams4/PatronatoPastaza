const controlador = require('../controllers/beneficiarioSM')
const express = require('express');
const router = express.Router();

router.post('/filtrar', controlador.filtrarBeneficiarioSM);

router.post('/todos', controlador.filtrarBeneficiario);

router.get('/', controlador.consultarBeneficiarioSM);

router.get('/nacionalidad', controlador.consultarNacionalidad);

router.get('/grupocultural', controlador.consultarGrupoCultural);

router.get('/estadocivil', controlador.consultarEstadoCivil);

router.get('/instruccion', controlador.consultarInstruccion);

router.get('/parentesco', controlador.consultarParentesco);

router.get('/provincia', controlador.consultarProvincia);

router.get('/canton/:id', controlador.consultarCanton);

router.get('/parroquia/:id', controlador.consultarParroquia);

router.get('/:idBeneficiario', controlador.consultarBeneficiarioPorID);

module.exports = router;
