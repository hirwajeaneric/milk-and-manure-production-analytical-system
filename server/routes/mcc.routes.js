const express = require('express');
const mccRouter = express.Router();

const {
  list,
  add,
  update,
  deleteMcc,
  findById,
  findByCode,
  findByNumber,
  findByStatus,
  findByDistrict,
} = require('../controllers/mcc.controllers');

mccRouter.get('/list', list);
mccRouter.post('/add', add);
mccRouter.put('/update', update);
mccRouter.delete('/delete', deleteMcc);
mccRouter.get('/findById', findById);
mccRouter.get('/findByCode', findByCode);
mccRouter.get('/findByNumber', findByNumber);
mccRouter.get('/findByStatus', findByStatus);
mccRouter.get('/findByDistrict', findByDistrict);

module.exports = mccRouter;
