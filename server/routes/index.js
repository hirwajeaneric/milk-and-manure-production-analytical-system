const express = require('express');
const router = express.Router();

const user = require('./user.routes');
const mcc = require('./mcc.routes');
const production = require('./production.routes');

router.use('/user', user);
router.use('/mcc', mcc);
router.use('/production', production);

module.exports = router;