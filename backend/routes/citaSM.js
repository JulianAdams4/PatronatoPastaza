const controlador = require("../controllers/citaSM");
const express = require("express");
const router = express.Router();

router.get("/atender", controlador.consultarAtenderPorServicioSM);

router.get("/servicio", controlador.consultarServiciosSM);

router.get("/exoneracion", controlador.consultarExoneracion);

router.get("/especialista/:idServicio", controlador.consultarEspecialista);

module.exports = router;