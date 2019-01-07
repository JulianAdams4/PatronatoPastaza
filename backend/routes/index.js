const express = require("express");
const router = express.Router();
const beneficiarioSM = require("./beneficiarioSM");
const login = require("./login");

router.use("/login", login);
router.use("/beneficiarioSM", beneficiarioSM);

module.exports = router;
