const express = require("express");
const router = express.Router();
const beneficiarioSM = require("./beneficiarioSM");

router.use("/beneficiarioSM", beneficiarioSM);

module.exports = router;
