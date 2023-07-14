const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: 'milk_and_manure'
});

module.exports = pool;