const pool = require('../database/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: statusCodes } = require('http-status-codes');
const { other_usersignInValidationSchema, other_usersignUpValidationSchema, userAccountSignUpValidationSchema, userAccountSignInValidationSchema } = require('../utils/validations/validateUserAccount');
const CustomError = require('../errors');
const sendEmail = require('../utils/email/sendEmail');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const asyncWrapper = require('../middleware/async');

const list = asyncWrapper(async (req, res, next) => {
    const other_users = await pool.query('SELECT * FROM other_users');
    other_users.rows.forEach(element => {
        delete element.password;
    });
    res.json({ users: other_users.rows });
});


const signin = asyncWrapper(async (req, res, next) => {
    const { role, province, district } = req.query;

    const { email, password } = req.body;
    
    if (!email || !password || !role) {
        throw new CustomError.BadRequestError('Please provide all required credentials');
    }   
    
    const { error } = userAccountSignInValidationSchema.validate({ email, password });
    if (error) { 
        return res.status(statusCodes.BAD_REQUEST).send({ msg: error.details[0].message }) 
    }

    const response = {};

    // VETERINARY LOGIN
    if (role === 'veterinary' && (!province || !district)) {
        throw new CustomError.BadRequestError('Signin failed. Please make sure you are using the appropriate login link.');
    } else if (role === 'veterinary' && province && district) {
        response = await pool.query('SELECT * FROM other_users WHERE email = $1 AND role = $2 AND province = $3 AND district = $4', [email, role, province, district]);
        if (response.rowCount === 0) {
            throw new CustomError.UnauthenticatedError('User account unrecognized');
        }    
    }

    // FARMER LOGIN
    if (role === 'farmer') {
        response = await pool.query('SELECT * FROM other_users WHERE email = $1 AND role= $2', [email, role]);
        if (response.rowCount === 0) {
            throw new CustomError.UnauthenticatedError('Invalid credentials')
        }    
    }

    // ADMIN/RAB LEVEL LOGIN
    if (role === 'rab') {
        response = await pool.query('SELECT * FROM other_users WHERE email = $1 AND role= $2', [email, role]);
        if (response.rowCount === 0) {
            throw new CustomError.UnauthenticatedError('Invalid credentials')
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

    var user = {};

    if (role === 'farmer') {
        user = {
            id: response.rows[0].id,
            fullName: response.rows[0].fullName,
            email: response.rows[0].email,
            role: response.rows[0].role,
            status: response.rows[0].status,
            province: response.rows[0].province,
            district: response.rows[0].district,
            sector: response.rows[0].sector,
            token: token,
        }
    } else if (role === 'veterinary') {
        user = {
            id: response.rows[0].id,
            fullName: response.rows[0].fullName,
            email: response.rows[0].email,
            role: response.rows[0].role,
            status: response.rows[0].status,
            province: response.rows[0].province,
            district: response.rows[0].district,
            token: token,
        }
    } else if (role === 'rab') {
        user = {
            id: response.rows[0].id,
            fullName: response.rows[0].fullName,
            email: response.rows[0].email,
            role: response.rows[0].role,
            status: response.rows[0].status,
            token: token,
        }
    }

    res.status(statusCodes.OK).json({
        message: 'Logged in',
        user
    })
});


const signup = asyncWrapper(async (req, res, next) => {
    const { fullName, email, phone, nationalId, province, district, sector, role, password } = req.body;
    
    const response = await pool.query('SELECT email FROM other_users WHERE email = $1', [email])
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
        'INSERT INTO other_users (id, fullName, email, phone, nationalId, province, district, sector, role, password, status, joinDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *', 
        [id, fullName, email, phone, nationalId, province, district, sector, role, hashedPassword, status, joinDate]
    );   

    const token = generateToken({
        id: recordedUser.rows[0].id, 
        role: recordedUser.rows[0].role, 
        email: recordedUser.rows[0].email
    });

    var createdAccount = {
        id: recordedUser.rows[0].id,
        fullName: recordedUser.rows[0].fullName,
        email: recordedUser.rows[0].email,
        role: recordedUser.rows[0].role,
        status: recordedUser.rows[0].status,
        token: token,
    };

    res.status(statusCodes.OK).json({
        message: 'Account created',
        user: createdAccount
    })
})


const add = asyncWrapper(async (req, res, next) => {
    const { fullName, email, phone, nationalId, province, district, sector, role, password } = req.body;
    
    const response = await pool.query('SELECT email FROM other_users WHERE email = $1', [email])
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

    await pool.query(
        'INSERT INTO other_users (id, fullName, email, phone, nationalId, province, district, sector, role, password, status, joinDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *', 
        [id, fullName, email, phone, nationalId, province, district, sector, role, hashedPassword, status, joinDate]
    );   
        
    var accessLink = '';
    var text = '';
    var subject='Your new account credentials for MMPAS';

    if (role === 'veterinary') {
        accessLink = `${process.env.CLIENT_ADDRESS}/vet/${district}/auth/signin`;
        text = `Dear ${fullName},\n\nHere are your credentials for for access to MMPAS:\n\nAccess link: ${accessLink}\nEmail: ${email}\nPassword: ${password} \n\nBest Regards, \n\nMMPAS`;
    } else if (role === 'farmer') {
        accessLink = `${process.env.CLIENT_ADDRESS}/${district}/auth/signin`;
        text = `Dear ${fullName},\n\nHere are your credentials for for access to MMPAS:\n\nAccess link: ${accessLink}\nEmail: ${email}\nPassword: ${password} \n\nBest Regards, \n\nMMPAS`;
    }

    // Sending an email notifying a user that an account was created for them.
    await sendEmail(email, subject, text);

    res.status(statusCodes.OK).json({ message: 'Account created' })
})


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

    const user = await pool.query('SELECT * FROM other_users WHERE id = $1', [req.query.id]);
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

    const updateUserAccount = await pool.query('UPDATE other_users SET password = $1 WHERE id = $2', [newHashedPassword, req.query.id]);

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
      text: `UPDATE other_users SET ${setExpressions.join(', ')} WHERE id = $${values.length + 1} RETURNING *`,
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
  
    const deleteUserAccount = await pool.query('DELETE FROM other_users WHERE id = $1', [id]);
  
    if (deleteUserAccount.rowCount === 0) {
      throw new CustomError.NotFoundError('User not found');
    }
  
    res.status(statusCodes.OK).json({ message: 'User account deleted' });
});
  

const findById = asyncWrapper(async (req, res, next) => {
    const { id } = req.query;
  
    const user = await pool.query('SELECT * FROM other_users WHERE id = $1', [id]);
    delete user.rows[0].password;
    
    if (user.rowCount === 0) {
      throw new CustomError.NotFoundError('User not found');
    }
  
    res.status(statusCodes.OK).json({ user: user.rows[0] });
});


const findByUserRole = asyncWrapper(async (req, res, next) => {
    const { role } = req.query;
  
    const users = await pool.query('SELECT * FROM other_users WHERE role = $1', [role]);
  
    res.status(statusCodes.OK).json({ users: users.rows });
});


const findByStatus = asyncWrapper(async (req, res, next) => {
    const { status } = req.query;
  
    const users = await pool.query('SELECT * FROM other_users WHERE status = $1', [status]);
  
    res.status(statusCodes.OK).json({ users: users.rows });
});


const findByDistrict = asyncWrapper(async(req, res, next) => {
    const { district } = req.query;
  
    const users = await pool.query('SELECT * FROM other_users WHERE district = $1', [district]);
  
    res.status(statusCodes.OK).json({ users: users.rows });
})

const findFarmersByDistrict = asyncWrapper(async(req, res, next) => {
    const { district } = req.query;
  
    const users = await pool.query('SELECT * FROM other_users WHERE district = $1 AND role = "farmer"', [district]);
  
    res.status(statusCodes.OK).json({ users: users.rows });
})


module.exports = { 
    list,
    signin, 
    signup, 
    deleteAccount, 
    add,
    updateAccount, 
    forgotPassword, 
    resetPassword, 
    findByDistrict, 
    findById,  
    findByStatus, 
    findByStatus,
    findByUserRole,
    findFarmersByDistrict
};