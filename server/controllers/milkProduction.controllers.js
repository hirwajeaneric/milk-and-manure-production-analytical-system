const pool = require('../database/db');
const { default: statusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const asyncWrapper = require('../middleware/async');
const CustomError = require('../errors');
const { productionValidationSchema } = require('../utils/validations/validateProductionRecord')

const list = asyncWrapper(async (req, res, next) => {
  const milkProductions = await pool.query('SELECT * FROM milk_production');
  res.json({ milkProduction: milkProductions.rows});
});

const add = asyncWrapper(async (req, res, next) => {
  const { farmerId, farmerName, farmerPhone, mccId, mccName, district, sector, quantity } = req.body;

  // Validate the milk production request body (You can create a validation schema similar to 'mccValidation' if needed).
  const { error } = productionValidationSchema.validate({ farmerName, farmerPhone, quantity })
  if (error) { 
    return res.status(statusCodes.BAD_REQUEST).send({ msg: error.details[0].message }) 
  }

  // Generate a unique ID for the milk production entry.
  const id = uuidv4();
  const date = new Date().toUTCString();
  const month = new Date().getMonth()+1;
  const year = new Date().getFullYear();

  // Insert the new milk production entry into the database.
  const newMilkProduction = await pool.query(
    'INSERT INTO milk_production (id, date, farmerId, farmerName, farmerPhone, mccId, mccName, district, sector, quantity, month, year ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
    [id, date, farmerId, farmerName, farmerPhone, mccId, mccName, district, sector, quantity, month, year]
  );

  res.status(statusCodes.CREATED).json({ milkProduction: newMilkProduction.rows[0] });
});

const update = asyncWrapper(async (req, res, next) => {
  const { id } = req.query;
  const changes = req.body;

  // Remove the 'id' field from the changes object to prevent updating the primary key.
  delete changes.id;

  // Check if any valid field is provided for updating.
  if (Object.keys(changes).length === 0) {
    throw new CustomError.BadRequestError('No valid fields provided for update.');
  }

  // You can add additional validation for the provided fields if needed.

  // Update the milk production data dynamically based on the provided changes.
  const setExpressions = Object.keys(changes).map((field, index) => `${field} = $${index + 2}`);
  const values = Object.values(changes);
  values.push(id);

  const query = {
    text: `UPDATE milk_production SET ${setExpressions.join(', ')} WHERE id = $1 RETURNING *`,
    values: values,
  };

  const updatedMilkProduction = await pool.query(query);

  if (updatedMilkProduction.rowCount === 0) {
    throw new CustomError.NotFoundError('Milk production entry not found');
  }

  res.status(statusCodes.OK).json({ milkProduction: updatedMilkProduction, message: 'Milk production data updated successfully' });
});

const remove = asyncWrapper(async (req, res, next) => {
  const { id } = req.query;

  const result = await pool.query('DELETE FROM milk_production WHERE id = $1', [id]);

  if (result.rowCount === 0) {
    throw new CustomError.NotFoundError('Milk production entry not found');
  }

  res.status(statusCodes.OK).json({ message: 'Milk production entry deleted successfully' });
});

const findById = asyncWrapper(async (req, res, next) => {
  const { id } = req.query;

  const milkProduction = await pool.query('SELECT * FROM milk_production WHERE id = $1', [id]);

  if (milkProduction.rowCount === 0) {
    throw new CustomError.NotFoundError('Milk production entry not found');
  }

  res.json({ milkProduction: milkProduction.rows[0] });
});

const findByFarmerId = asyncWrapper(async (req, res, next) => {
  const { farmerId } = req.query;

  const milkProductions = await pool.query('SELECT * FROM milk_production WHERE farmerId = $1', [farmerId]);

  res.json({ milkProduction: milkProductions.rows });
});

const findByMccId = asyncWrapper(async (req, res, next) => {
  const { mccId } = req.query;

  const milkProductions = await pool.query('SELECT * FROM milk_production WHERE mccId = $1', [mccId]);

  res.json({ milkProductions: milkProductions.rows });
});

const findByDistrict = asyncWrapper(async (req, res, next) => {
  const { district } = req.query;

  const milkProductions = await pool.query('SELECT * FROM milk_production WHERE district = $1', [district]);

  res.json({ milkProductions: milkProductions.rows });
});

const findBySector = asyncWrapper(async (req, res, next) => {
  const { sector } = req.query;

  const milkProductions = await pool.query('SELECT * FROM milk_production WHERE sector = $1', [sector]);

  res.json({ milkProductions: milkProductions.rows });
});

module.exports = {
  list,
  add,
  update,
  remove,
  findById,
  findByFarmerId,
  findByMccId,
  findByDistrict,
  findBySector,
};
