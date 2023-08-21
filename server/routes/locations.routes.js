const express = require('express');
const locationRoutes = express.Router();

const {
  findCells,
  findDistricts,
  findProvinces,
  findSectors,
  findVillages,
} = require('../controllers/locationManager');

locationRoutes.get('/provinces', findProvinces);
locationRoutes.get('/districts', findDistricts);
locationRoutes.get('/sectors', findSectors);
locationRoutes.get('/cells', findCells);
locationRoutes.get('/villages', findVillages);

module.exports = locationRoutes;
