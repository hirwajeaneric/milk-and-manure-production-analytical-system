const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const employeeSignUpValidationSchema = joi.object({
    fullName: joi.string().required().label('Full name'),
    email: joi.string().email().required().label('Email'),
    phone: joi.string().length(10).required().label('Phone'),
    gender: joi.string().required().label('Gender'),
    dateOfBirth: joi.date().required().label('Date of Birth'),
    nationalId: joi.string().length(16).required().label('National'),
    state: joi.string().required().label('State'),
    city: joi.string().required().label('City'),
    province: joi.string().required().label('Province'),
    district: joi.string().required().label('District'),
    sector: joi.string().required().label('Sector'),
    cell: joi.string().required().label('Cell'),
    village: joi.string().required().label('Village'),
    password: passwordComplexity().required().label('Password'),
});

const employeeSignInValidationSchema = joi.object({
    email: joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
})

module.exports = {
    employeeSignUpValidationSchema,
    employeeSignInValidationSchema
};