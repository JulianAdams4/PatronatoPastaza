const express = require('express');
const router = express.Router();
const beneficiario = require('./beneficiario');

router.use('/beneficiario', beneficiario);

module.exports = router;
