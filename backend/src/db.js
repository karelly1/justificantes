const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',        // localhost para dev local, "mysql" en Actions
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'mysql123', // local dev
  database: process.env.DB_NAME || 'justificantes_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

