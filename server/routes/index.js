const express = require('express');
const router = express.Router();

const otherUser = require('./otherUsers.routes');
const mccUser = require('./mccUser.routes');
const mcc = require('./mcc.routes');
const milkProduction = require('./milkProduction.routes');
const manureProduction = require('./manureProduction.routes');
const locationRoutes = require('./locations.routes');

router.use('/otheruser', otherUser);
router.use('/mccuser', mccUser);
router.use('/mcc', mcc);
router.use('/manure', manureProduction);
router.use('/milk', milkProduction);

// Special for Rwanda locations 
router.use('/locations', locationRoutes);

module.exports = router;