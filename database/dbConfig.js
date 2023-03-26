require('dotenv').config();

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = process.env.DB_URL;

const db = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});

module.exports = db;
