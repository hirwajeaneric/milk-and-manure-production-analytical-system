const express = require('express');
const router = express.Router();

const user = require('./user.routes');
const mcc = require('./mcc.routes');
const milkProduction = require('./manureProduction.routes');
const manureProduction = require('./milkProduction.routes');

router.use('/user', user);
router.use('/mcc', mcc);
router.use('/manure', manureProduction);
router.use('/milk', manureProduction);

module.exports = router;