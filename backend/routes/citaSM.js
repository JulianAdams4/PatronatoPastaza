const controlador = require("../controllers/citaSM");
const express = require("express");
const router = express.Router();

router.post("/atender", controlador.consultarAtenderPorServicioSM);

router.get("/servicio", controlador.consultarServiciosSM);

router.get("/exoneracion", controlador.consultarExoneracion);

router.get("/especialista/:idServicio", controlador.consultarEspecialista);

router.post("/marcarAsistencia", controlador.marcarAsistenciaACitaSM);

router.post("/eliminar", controlador.eliminarCitaSM);

router.post("/crear", controlador.crearCitaSM);

module.exports = router;