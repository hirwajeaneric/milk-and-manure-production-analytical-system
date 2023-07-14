const pool = require('../database/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signin = (req, res, next) => {

}

const signup = (req, res, next) => {
    
}

const createAccountForUser = (req, res, next) => {
    
}

const forgotPassword = (req, res, next) => {

}

const resetPassword = (req, res, next) => {
    
}

const updateAccount = (req, res, next) => {
    
}

const deleteAccount = (req, res, next) => {
    
}

const findById = (req, res, next) => {
    
}

const findByUserRole = (req, res, next) => {
    
}

const findByStatus = (req, res, next) => {
    
}

const findByMccId = (req, res, next) => {
    
}


const findByDistrict = (req, res, next) => {
    
}

module.exports = { 
    signin, 
    signup, 
    createAccountForUser, 
    deleteAccount, 
    updateAccount, 
    forgotPassword, 
    resetPassword, 
    findByDistrict, 
    findById, 
    findByMccId, 
    findByStatus, 
    findByStatus,
    findByUserRole
};