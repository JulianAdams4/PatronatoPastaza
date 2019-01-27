const controlador = require("../controllers/beneficiarioSM");
const express = require("express");
const router = express.Router();

router.get("/", controlador.consultarBeneficiarioSM);

router.post("/crear", controlador.ingresarBeneficiarioSM);

router.post("/filtrar", controlador.filtrarBeneficiarioSM);

router.post("/todos", controlador.filtrarBeneficiario);

router.get("/provincia", controlador.consultarProvincia);

router.get("/canton/:idProvincia", controlador.consultarCanton);

router.get("/parroquia/:idCanton", controlador.consultarParroquia);

router.get("/nacionalidad", controlador.consultarNacionalidad);

router.get("/grupocultural", controlador.consultarGrupoCultural);

router.get("/estadocivil", controlador.consultarEstadoCivil);

router.get("/instruccion", controlador.consultarInstruccion);

router.get("/parentesco", controlador.consultarParentesco);

router.get("/:idBeneficiario", controlador.consultarBeneficiarioPorID);

module.exports = router;