// backend/src/server.js
const app = require('./app');
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Servidor en http://localhost:${PORT}'));
module.exports = app;
