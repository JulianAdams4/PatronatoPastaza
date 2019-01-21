const express = require('express');
const router = express.Router();
const beneficiarioSM = require('./beneficiarioSM');
const citaSM = require('./citaSM');

router.use('/beneficiarioSM', beneficiarioSM);
router.use('/citaSM', citaSM);

module.exports = router;
