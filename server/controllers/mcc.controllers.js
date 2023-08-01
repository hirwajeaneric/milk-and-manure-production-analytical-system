const pool = require('../database/db');
const { default: statusCodes } = require('http-status-codes');
const { addMccValidationSchema: mccValidation } = require('../utils/validations/validateMCC');
const CustomError = require('../errors');
const Joi = require('joi');
const asyncWrapper = require('../middleware/async');


const list = asyncWrapper(async (req, res, next) => {
  const mccs = await pool.query('SELECT * FROM mccs');
  res.json(mccs.rows);
});



const add = asyncWrapper(async (req, res, next) => {
    const { name, province, district, sector} = req.body;

    // Validate mcc request body
    const { error } = mccValidation.validate({ name, province, district, sector });
    if (error) { 
        return res.status(statusCodes.BAD_REQUEST).send({ msg: error.details[0].message }) 
    }

    // Check the already registered MCCs in the provided district to determine the next number.
    const existingMccs = await pool.query('SELECT * FROM mccs WHERE district = $1', [district]);
    const number = existingMccs.rowCount + 1;

    // Get the current date for the registrationDate.
    const registrationDate = new Date().toISOString();

    // Default mcc status is active
    const status = 'active';

    // Generate the code based on the district name in lowercase and the number of the MCC.
    const codeNumber = String(number).padStart(2, '0');
    const codeValue = `${district.toLowerCase()}${codeNumber}`;

    // Insert the new MCC into the database.
    const newMcc = await pool.query(
        'INSERT INTO mccs (name, number, province, district, sector, code, status, registrationDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [name, number, province, district, sector, codeValue, status, registrationDate]
    );

    res.status(statusCodes.CREATED).json(newMcc.rows[0]);
});



const update = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;

    // Remove the 'id' field from the changes object to prevent updating the primary key.
    delete changes.id;

    // Check if any valid field is provided for updating.
    if (Object.keys(changes).length === 0) {
        throw new CustomError.BadRequestError('No valid fields provided for update.');
    }

    const validFields = ['name', 'sector', 'status'];

    const invalidFields = Object.keys(changes).filter(field => !validFields.includes(field));

    if (invalidFields.length > 0) {
        throw new CustomError.BadRequestError(`Invalid field(s): ${invalidFields.join(', ')}`);
    }

    // Update the MCC data dynamically based on the provided changes.
    const setExpressions = Object.keys(changes).map((field, index) => `${field} = $${index + 2}`);
    const values = Object.values(changes);
    values.push(id);

    const query = {
        text: `UPDATE mccs SET ${setExpressions.join(', ')} WHERE id = $1`,
        values: values,
    };

    const updatedMcc = await pool.query(query);

    if (updatedMcc.rowCount === 0) {
        throw new CustomError.NotFoundError('MCC not found');
    }

    res.status(statusCodes.OK).json({ message: 'MCC data updated successfully' });
});



const deleteMcc = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const deleteMcc = await pool.query('DELETE FROM mccs WHERE id = $1', [id]);

    if (deleteMcc.rowCount === 0) {
        throw new CustomError.NotFoundError('MCC not found');
    }

    res.status(statusCodes.OK).json({ message: 'MCC deleted' });
});



const findById = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const mcc = await pool.query('SELECT * FROM mccs WHERE id = $1', [id]);

    if (mcc.rowCount === 0) {
        throw new CustomError.NotFoundError('MCC not found');
    }

    res.status(statusCodes.OK).json(mcc.rows[0]);
});



const findByCode = asyncWrapper(async (req, res, next) => {
    const { code } = req.query;

    const mcc = await pool.query('SELECT * FROM mccs WHERE code = $1', [code]);

    if (mcc.rowCount === 0) {
        throw new CustomError.NotFoundError('MCC not found');
    }

    res.status(statusCodes.OK).json(mcc.rows[0]);
});


const findByNumber = asyncWrapper(async (req, res, next) => {
    const { number } = req.query;

    const mcc = await pool.query('SELECT * FROM mccs WHERE number = $1', [number]);

    if (mcc.rowCount === 0) {
        throw new CustomError.NotFoundError('MCC not found');
    }

    res.status(statusCodes.OK).json(mcc.rows[0]);
});


const findByStatus = asyncWrapper(async (req, res, next) => {
    const { status } = req.query;

    const mccs = await pool.query('SELECT * FROM mccs WHERE status = $1', [status]);

    res.status(statusCodes.OK).json(mccs.rows);
});


module.exports = {
    list,
    add,
    update,
    deleteMcc,
    findById,
    findByCode,
    findByNumber,
    findByStatus,
};
