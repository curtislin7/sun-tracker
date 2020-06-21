const { Pool, Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ 
    connectionString, ssl: {
    rejectUnauthorized: false
} });

module.exports = pool;

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//     rejectUnauthorized: false
//     }
// });

// module.exports = client;

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });