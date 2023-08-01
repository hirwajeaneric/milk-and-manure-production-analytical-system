const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const usrAccountSignUpValidationSchema = joi.object({
    fullName: joi.string().required().label('Full name'),
    email: joi.string().email().required().label('Email'),
    phone: joi.string().length(10).required().label('Phone'),
    nationalId: joi.string().length(16).required().label('National'),
    role: joi.string().required().label('Role'),
    status: joi.string().required().label('Status'),
    password: passwordComplexity().required().label('Password'),
});

const usrAccountSignInValidationSchema = joi.object({
    email: joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
});

module.exports = {
    usrAccountSignUpValidationSchema,
    usrAccountSignInValidationSchema
};