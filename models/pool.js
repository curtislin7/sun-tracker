const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ 
    connectionString, ssl: {
    rejectUnauthorized: false
} });

module.exports = pool;