const express = require("express");
const router = express.Router();
const beneficiarioSM = require("./beneficiarioSM");
const login = require("./login");
const usuario = require("./usuario");

router.use("/login", login);
router.use("/beneficiarioSM", beneficiarioSM);
router.use("/usuario", usuario);

module.exports = router;
