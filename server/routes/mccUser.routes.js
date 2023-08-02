const express = require('express');
const userRouter = express.Router();

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

userRouter.post('/signin', signin);
userRouter.post('/add', add);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.post('/resetPassword', resetPassword);
userRouter.put('/update', updateAccount);
userRouter.delete('/delete', deleteAccount);
userRouter.get('/list', list);
userRouter.get('/findById', findById);
userRouter.get('/findByDistrict', findByDistrict);
userRouter.get('/findByMccId', findByMccId);
userRouter.get('/findByStatus', findByStatus);

module.exports = userRouter;