const request = require('supertest');
const express = require('express');
const router = require('../src/routes/solicitudes');
const pool = require('../src/db');

const app = express();
app.use(express.json());
app.use('/solicitudes', router);

beforeAll(async () => {
  // Crear tabla si no existe
  await pool.query(`
    CREATE TABLE IF NOT EXISTS solicitudes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100),
      grupo VARCHAR(50),
      motivo TEXT,
      fecha_ausencia DATE,
      fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Limpiar tabla antes de tests
  await pool.query('DELETE FROM solicitudes');
});

afterAll(async () => {
  await pool.end();
});

describe('API /solicitudes', () => {
  test('POST /solicitudes crea una solicitud', async () => {
    const nuevaSolicitud = {
      nombre: 'Juan Pérez',
      grupo: '3A',
      motivo: 'Cita médica',
      fecha_ausencia: '2025-10-07'
    };

    const response = await request(app)
      .post('/solicitudes')
      .send(nuevaSolicitud);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  test('GET /solicitudes devuelve lista de solicitudes', async () => {
    const response = await request(app).get('/solicitudes');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
