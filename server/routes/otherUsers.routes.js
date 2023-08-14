const express = require('express');
const otherUserRouter = express.Router();

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
    add,
    updateAccount,
    findFarmersByDistrict
 } = require('../controllers/otherUsers.controllers');

otherUserRouter.post('/signin', signin);
otherUserRouter.post('/signup', signup);
otherUserRouter.post('/add', add);
otherUserRouter.post('/forgotPassword', forgotPassword);
otherUserRouter.post('/resetPassword', resetPassword);
otherUserRouter.put('/update', updateAccount);
otherUserRouter.delete('/delete', deleteAccount);
otherUserRouter.get('/list', list);
otherUserRouter.get('/findById', findById);
otherUserRouter.get('/findByDistrict', findByDistrict);
otherUserRouter.get('/findByStatus', findByStatus);
otherUserRouter.get('/findByUserRole', findByUserRole);
otherUserRouter.get('/findFarmersByDistrict', findFarmersByDistrict);

module.exports = otherUserRouter;