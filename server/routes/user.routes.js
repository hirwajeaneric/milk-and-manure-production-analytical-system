const express = require('express');
const userRouter = express.Router();

const {
    list,
    createAccountForUser,
    deleteAccount,
    findByDistrict,
    findById, 
    findByMccId,
    findByStatus, 
    findByUserRole, 
    forgotPassword,
    resetPassword,
    signin,
    signup,
    updateAccount
 } = require('../controllers/user.controllers');

userRouter.post('/signin', signin);
userRouter.post('/signup', signup);
userRouter.post('/add', createAccountForUser);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.post('/resetPassword', resetPassword);
userRouter.put('/update', updateAccount);
userRouter.delete('/delete', deleteAccount);
userRouter.get('/list', list);
userRouter.get('/findById', findById);
userRouter.get('/findByDistrict', findByDistrict);
userRouter.get('/findByMccId', findByMccId);
userRouter.get('/findByStatus', findByStatus);
userRouter.get('/findByUserRole', findByUserRole);