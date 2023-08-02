const express = require('express');
const router = express.Router();

const otherUser = require('./otherUsers.routes');
const mccUser = require('./mccUser.routes');
const mcc = require('./mcc.routes');
// const milkProduction = require('./manureProduction.routes');
// const manureProduction = require('./milkProduction.routes');

router.use('/otheruser', otherUser);
router.use('/mccuser', mccUser);
router.use('/mcc', mcc);
// router.use('/manure', manureProduction);
// router.use('/milk', milkProduction);

module.exports = router;