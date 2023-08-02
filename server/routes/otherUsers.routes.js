const express = require('express');
const userRouter = express.Router();

const {
    list,
    deleteAccount,
    findByDistrict,
    findById, 
    findByStatus, 
    findByUserRole, 
    forgotPassword,
    resetPassword,
    signin,
    signup,
    updateAccount
 } = require('../controllers/otherUsers.controllers');

userRouter.post('/signin', signin);
userRouter.post('/signup', signup);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.post('/resetPassword', resetPassword);
userRouter.put('/update', updateAccount);
userRouter.delete('/delete', deleteAccount);
userRouter.get('/list', list);
userRouter.get('/findById', findById);
userRouter.get('/findByDistrict', findByDistrict);
userRouter.get('/findByStatus', findByStatus);
userRouter.get('/findByUserRole', findByUserRole);

module.exports = userRouter;