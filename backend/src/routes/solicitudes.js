// backend/src/routes/solicitudes.js
const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM solicitudes ORDER BY fecha_solicitud DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
});

router.post('/', async (req, res) => {
  const { nombre, grupo, motivo, fecha_ausencia } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO solicitudes (nombre, grupo, motivo, fecha_ausencia) VALUES (?, ?, ?, ?)',
      [nombre, grupo, motivo, fecha_ausencia]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al insertar' });
  }
});

module.exports = router;
