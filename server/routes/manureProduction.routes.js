const express = require('express');
const manureProductionRouter = express.Router();

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
} = require('../controllers/manureProduction.controllers');

manureProductionRouter.get('/list', list);
manureProductionRouter.post('/add', add);
manureProductionRouter.put('/update', update);
manureProductionRouter.delete('/delete', remove);
manureProductionRouter.get('/findById', findById);
manureProductionRouter.get('/findByFarmerId', findByFarmerId);
manureProductionRouter.get('/findByMccId', findByMccId);
manureProductionRouter.get('/findByDistrict', findByDistrict);
manureProductionRouter.get('/findBySector', findBySector);

module.exports = manureProductionRouter;
