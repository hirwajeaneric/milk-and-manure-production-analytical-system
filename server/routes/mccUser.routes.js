const express = require('express');
const mccUserRouter = express.Router();

const {
    list,
    deleteAccount,
    findByDistrict,
    findById, 
    findByMccId,
    findByStatus, 
    forgotPassword,
    resetPassword,
    signin,
    add,
    updateAccount
 } = require('../controllers/mccUser.controllers');

mccUserRouter.post('/signin', signin);
mccUserRouter.post('/add', add);
mccUserRouter.post('/forgotPassword', forgotPassword);
mccUserRouter.post('/resetPassword', resetPassword);
mccUserRouter.put('/update', updateAccount);
mccUserRouter.delete('/delete', deleteAccount);
mccUserRouter.get('/list', list);
mccUserRouter.get('/findById', findById);
mccUserRouter.get('/findByDistrict', findByDistrict);
mccUserRouter.get('/findByMccId', findByMccId);
mccUserRouter.get('/findByStatus', findByStatus);

module.exports = mccUserRouter;