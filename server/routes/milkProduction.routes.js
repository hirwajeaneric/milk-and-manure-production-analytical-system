const express = require('express');
const milkProductionRouter = express.Router();

const {
    list,
    add,
    update,
    remove,
    findById,
    findByFarmerId,
    findByMccId,
    findByDistrict,
    findBySector,
} = require('../controllers/milkProduction.controllers');

milkProductionRouter.get('/list', list);
milkProductionRouter.post('/add', add);
milkProductionRouter.put('/update', update);
milkProductionRouter.delete('/delete', remove);
milkProductionRouter.get('/findById', findById);
milkProductionRouter.get('/findByFarmerId', findByFarmerId);
milkProductionRouter.get('/findByMccId', findByMccId);
milkProductionRouter.get('/findByDistrict', findByDistrict);
milkProductionRouter.get('/findBySector', findBySector);

module.exports = milkProductionRouter;
