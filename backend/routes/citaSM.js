const controlador = require("../controllers/citaSM");
const express = require("express");
const router = express.Router();

router.get("/atender", controlador.consultarAtenderPorServicioSM);

module.exports = router;