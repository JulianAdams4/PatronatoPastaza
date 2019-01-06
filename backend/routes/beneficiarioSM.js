const controlador = require("../controllers/beneficiarioSM");
const express = require("express");
const router = express.Router();

router.get("/", controlador.consultarBeneficiarioSM);

//router.post('/',);

module.exports = router;
