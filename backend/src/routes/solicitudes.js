import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// Crear solicitud
router.post("/", async (req, res) => {
  const { nombre, grupo, motivo, fecha } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO solicitudes (nombre, grupo, motivo, fecha) VALUES (?, ?, ?, ?)",
      [nombre, grupo, motivo, fecha]
    );
    res.json({ id: result.insertId, nombre, grupo, motivo, fecha });
  } catch (error) {
    res.status(500).json({ error: "Error al insertar solicitud" });
  }
});

// Listar solicitudes
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM solicitudes");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener solicitudes" });
  }
});

export default router;
