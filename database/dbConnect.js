const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DB_URL,
});

module.exports = db;
