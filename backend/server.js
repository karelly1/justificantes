const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
// backend/src/server.js
const app = require('./app');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Middleware
app.use(cors());
app.use(express.json());

// Conexión con MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       
  password: 'mysql123',      
  database: 'justificantes_db'
});



// Verificar conexión
db.connect(err => {
  if (err) {
    console.error('Error al conectar con MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});


// ----------------- ENDPOINTS -----------------

// 1. Registrar una solicitud (POST)
app.post('/solicitudes', (req, res) => {
  const { nombre, grupo, motivo, fecha_ausencia } = req.body;

  const sql = 'INSERT INTO solicitudes (nombre, grupo, motivo, fecha_ausencia) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, grupo, motivo, fecha_ausencia], (err, result) => {
    if (err) {
      console.error('Error al insertar:', err);
      return res.status(500).json({ error: 'Error al registrar solicitud' });
    }
    res.json({ id: result.insertId, message: 'Solicitud registrada con éxito' });
  });
});

// 2. Consultar todas las solicitudes (GET)
app.get('/solicitudes', (req, res) => {
  const sql = 'SELECT * FROM solicitudes ORDER BY fecha_solicitud DESC';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error al consultar:', err);
      return res.status(500).json({ error: 'Error al obtener solicitudes' });
    }
    res.json(rows);
  });
});

// 3. Consultar una solicitud específica por ID (GET)
app.get('/solicitudes/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM solicitudes WHERE id = ?';
  db.query(sql, [id], (err, rows) => {
    if (err) {
      console.error('Error al consultar:', err);
      return res.status(500).json({ error: 'Error al obtener solicitud' });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }
    res.json(rows[0]);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
