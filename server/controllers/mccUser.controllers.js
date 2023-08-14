const pool = require('../database/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: statusCodes } = require('http-status-codes');
const { userAccountSignUpValidationSchema, userAccountSignInValidationSchema } = require('../utils/validations/validateUserAccount');
const CustomError = require('../errors');
const sendEmail = require('../utils/email/sendEmail');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const asyncWrapper = require('../middleware/async');

const list = asyncWrapper(async (req, res, next) => {
    const mcc_users = await pool.query('SELECT * FROM mcc_users');
    mcc_users.rows.forEach(element => {
        delete element.password;
    });
    res.status(statusCodes.OK).json({ users: mcc_users.rows });
});


const signin = asyncWrapper(async (req, res, next) => {
    const { email, password, role, mccCode  } = req.body;
    
    if (!email || !password || !role || !mccCode ) {
        throw new CustomError.BadRequestError('Please provide all required credentials');
    }   
    
    const { error } = userAccountSignInValidationSchema.validate({ email, password });
    if (error) { 
        return res.status(statusCodes.BAD_REQUEST).send({ msg: error.details[0].message }) 
    }

    var response = {};
    var userMcc = {};

    if (!mccCode) {
        throw new CustomError.BadRequestError('Please provide all required credentials');
    } else if (mccCode) {
        
        userMcc = await pool.query('SELECT * FROM mccs WHERE code = $1', [mccCode]);

        response = await pool.query('SELECT * FROM mcc_users WHERE email = $1 AND role = $2 AND mccId = $3', [email, role, userMcc.rows[0].id]);
        if (response.rowCount === 0) {
            throw new CustomError.UnauthenticatedError('User account unrecognized');
        }    
    }

    const isPasswordCorrect = await comparePassword(password, response.rows[0].password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid credentials');
    }
    
    const token = generateToken({ 
        id: response.rows[0].id,
        email: response.rows[0].email,
        role: response.rows[0].role,
    })

    const user = {
        id: response.rows[0].id,
        fullName: response.rows[0].fullName,
        email: response.rows[0].email,
        role: response.rows[0].role,
        mccId: userMcc.rows[0].id,
        mccName: userMcc.rows[0].name,
        status: response.rows[0].status,
        token: token,
    };

    res.status(statusCodes.CREATED).json({
        message: 'Logged in',
        user
    })
});


const add = asyncWrapper(async (req, res, next) => {
    const { fullName, email, phone, nationalId, province, district, sector, role, password, mccId, mccName } = req.body;
    
    const response = await pool.query('SELECT email FROM mcc_users WHERE email = $1', [email])
    if (response.rowCount > 0) {
        return res.status(statusCodes.BAD_REQUEST).send({ msg: `User with provided email is already registered`})
    }

    const { error } = userAccountSignUpValidationSchema.validate({ fullName, email, phone, nationalId, role, password });
    if (error) { 
        return res.status(statusCodes.BAD_REQUEST).send({ msg: error.details[0].message }) 
    }
    
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt); 
    var id = uuidv4(); 
    var joinDate = new Date().toISOString();
    var status = 'active';

    const recordedUser = await pool.query(
        'INSERT INTO mcc_users (id, fullName, email, phone, nationalId, province, district, sector, role, password, status, mccId, mccName, joinDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *', 
        [id, fullName, email, phone, nationalId, province, district, sector, role, hashedPassword, status, mccId, mccName, joinDate]
    );   

    // Fetching the mcc information to get the mcc code
    const mcc = await pool.query('SELECT * FROM mccs WHERE id= $1', [mccId]);

    var accessLink = `${process.env.CLIENT_ADDRESS}/mcc/${mcc.rows[0].code}/auth/sign`;
    var subject='Your new account credentials for MMPAS';
    var text = `Dear ${fullName},\n\nHere are your credentials for for access to MMPAS:\n\nMCC Access link: ${accessLink}\nEmail: ${email}\nPassword: ${password} \n\nBest Regards, \n\nMMPAS`;

    // Sending an email notifying a user that an account was created for them.
    await sendEmail(email, subject, text);

    res.status(statusCodes.CREATED).json({ message: 'Account created', user: recordedUser.rows[0] })
});


const generateToken = function (parameters) {
    const { id, role, email } = parameters;
    return jwt.sign(
        {
            userId: id, 
            role: role,
            email: email
        },
        process.env.JWT_SECRET_KEY, 
        {
            expiresIn: process.env.JWT_LIFETIMEOUT
        }
    )
}


const comparePassword = async (candidatePassword, existingUserPassword) => {
    const isMatch = await bcrypt.compare(candidatePassword, existingUserPassword);
    return isMatch;
}


const forgotPassword = asyncWrapper(async(req, res, next) => {
    const { email } = req.body;
    
    if (!email) { 
        throw new CustomError.BadRequestError('Your email is required' ); 
    }

    const isTheUserRegistered = await pool.query('SELECT * FROM EMPLOYEE WHERE email= $1',[email]);
    
    if (isTheUserRegistered.rowCount === 0) {
        throw new CustomError.BadRequestError('Email address unrecognized');
    }

    let token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, { expiresIn: 1000 });
    let link = `${process.env.CLIENT_ADDRESS}/${token}/${isTheUserRegistered.rows[0].id}`;

    await sendEmail(isTheUserRegistered.rows[0].id, 'Reset password link', link);

    res.status(statusCodes.OK).json({ message: 'Check your email for a reset password link.'})
})


const resetPassword = asyncWrapper(async(req, res, next) => {
    const password = req.body.password;

    const user = await pool.query('SELECT * FROM mcc_users WHERE id = $1', [req.query.id]);
    if (user.rowCount === 0) {
        throw new CustomError.BadRequestError('Invalid or expired link');
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startWith('Bearer')) {
        throw new CustomError.UnauthenticatedError('Invalid authorization');
    }

    const token = authHeader.split( )[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!payload) {
        throw new CustomError.UnauthenticatedError('Invalid or expired link');
    }

    const passwordValidationSchema = Joi.object({
        password: passwordComplexity().required().label('Password')
    })

    const { error } = passwordValidationSchema.validate(req.body);
    if (error) {
        throw new CustomError.BadRequestError(error.details[0].message);
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(password, salt);

    const updateUserAccount = await pool.query('UPDATE mcc_users SET password = $1 WHERE id = $2', [newHashedPassword, req.query.id]);

    if (!updateUserAccount) {
        throw new CustomError.UnauthenticatedError('Unable to change password');
    }
    res.status(statusCodes.OK).json({ message: 'Password changed'});
})


const updateAccount = asyncWrapper(async(req, res, next) => {
    const changes = req.body;

    // Remove the 'id' field from the changes object to prevent updating the primary key.
    delete changes.id;

    // Check if any valid field is provided for updating.
    if (Object.keys(changes).length === 0) {
      throw new CustomError.BadRequestError('No valid fields provided for update.');
    }

    const validFields = [ 'fullName', 'email', 'phone', 'gender', 'dateOfBirth', 'nationalId', 'state', 'city', 'province', 'district', 'sector', 'cell', 'village', 'role', 'password', 'status',];

    const invalidFields = Object.keys(changes).filter(field => !validFields.includes(field));

    if (invalidFields.length > 0) {
      throw new CustomError.BadRequestError(`Invalid field(s): ${invalidFields.join(', ')}`);
    }

    // Generate the dynamic SQL query for updating the specified fields.
    const setExpressions = Object.keys(changes).map((field, index) => `${field} = $${index + 1}`);
    const values = Object.values(changes);

    const query = {
      text: `UPDATE mcc_users SET ${setExpressions.join(', ')} WHERE id = $${values.length + 1} RETURNING *`,
      values: [...values, req.query.id],
    };

    // Execute the update query.
    const result = await pool.query(query);

    if (result.rowCount === 0) {
      throw new CustomError.NotFoundError('User not found');
    }

    res.status(statusCodes.OK).json({ message: 'User data updated successfully', user: result.rows[0] });
})


const deleteAccount = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
  
    const deleteUserAccount = await pool.query('DELETE FROM mcc_users WHERE id = $1', [id]);
  
    if (deleteUserAccount.rowCount === 0) {
      throw new CustomError.NotFoundError('User not found');
    }
  
    res.status(statusCodes.OK).json({ message: 'User account deleted' });
});
  

const findById = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
  
    const user = await pool.query('SELECT * FROM mcc_users WHERE id = $1', [id]);
    delete user.rows[0].password;

    if (user.rowCount === 0) {
      throw new CustomError.NotFoundError('User not found');
    }
  
    res.status(statusCodes.OK).json({ user: user.rows[0] });
});


const findByStatus = asyncWrapper(async (req, res, next) => {
    const { status } = req.query;
  
    const users = await pool.query('SELECT * FROM mcc_users WHERE status = $1', [status]);
  
    res.status(statusCodes.OK).json({ users: users.rows });
});


const findByMccId = asyncWrapper(async(req, res, next) => {
    const { mccId } = req.query;
  
    const users = await pool.query('SELECT * FROM mcc_users WHERE mccId = $1', [mccId]);
  
    res.status(statusCodes.OK).json({ users: users.rows });
});


const findByDistrict = asyncWrapper(async(req, res, next) => {
    const { district } = req.query;
  
    const users = await pool.query('SELECT * FROM mcc_users WHERE district = $1', [district]);
  
    res.status(statusCodes.OK).json({ users: users.rows });
})


module.exports = { 
    list,
    signin, 
    add, 
    deleteAccount, 
    updateAccount, 
    forgotPassword, 
    resetPassword, 
    findByDistrict, 
    findById, 
    findByMccId, 
    findByStatus, 
    findByStatus,
};