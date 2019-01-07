const controlador = require("../controllers/login");
const express = require("express");
const router = express.Router();


router.post("/", controlador.login);

router.get("/out", controlador.logout);


module.exports = router;