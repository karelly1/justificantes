import express from "express";
import cors from "cors";
import solicitudesRoutes from "./routes/solicitudes.js";
import dotenv from "dotenv";

dotenv.config();

const express = require('express');
const solicitudesRouter = require('./routes/solicitudes');

const app = express();
app.use(express.json());
app.use('/solicitudes', solicitudesRouter);

module.exports = app;
app.use(cors());
app.use(express.json());

// Rutas
app.use("/solicitudes", solicitudesRoutes);

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
module.exports = app;

