const express = require("express");
require("dotenv").config();

const loginRoutes = require("./routes/LoginRoutes");
const usuariosRoutes = require("./routes/UsuariosRoutes");

const app = express();
app.use(express.json());

// Rutas
app.use("/auth", loginRoutes);
app.use("/usuarios", usuariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
