const controlador = require("../controllers/beneficiarioSM");
const express = require("express");
const router = express.Router();

router.get("/", controlador.consultarBeneficiarioSM);

router.post("/", controlador.ingresarBeneficiarioSM);

router.post("/filtrar", controlador.filtrarBeneficiarioSM);

router.post("/todos", controlador.filtrarBeneficiario);

router.get("/provincia", controlador.consultarProvincia);

router.get("/canton/:idProvincia", controlador.consultarCanton);

router.get("/parroquia/:idCanton", controlador.consultarParroquia);

module.exports = router;
