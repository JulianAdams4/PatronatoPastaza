const express = require("express");
const router = express.Router();
const controlador = require("../controllers/usuario");

router.get("/proyecto", controlador.obtenerProyectos);


module.exports = router;
