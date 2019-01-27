const express = require("express");
const router = express.Router();
const beneficiarioSM = require("./beneficiarioSM");
const login = require("./login");
const usuario = require("./usuario");
const citaSM = require("./citaSM");

router.use("/login", login);
router.use("/beneficiarioSM", beneficiarioSM);
router.use("/usuario", usuario);
router.use("/citaSM", citaSM);

module.exports = router;
