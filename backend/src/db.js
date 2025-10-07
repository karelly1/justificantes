const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',  // ahora será 127.0.0.1 en Actions
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'mysql123',
  database: process.env.DB_NAME || 'justificantes_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


