const express = require("express");
require("dotenv").config();

const loginRoutes = require("./src/routes/LoginRoutes");
const usuariosRoutes = require("./src/routes/UsuariosRoutes");
const rolesRoutes = require("./src/routes/RolesRoutes");

const app = express();

// Middlewares
app.use(express.json()); // parsea JSON
app.use(express.urlencoded({ extended: true })); // parsea form-data
app.use("/uploads", express.static("uploads")); // sirve las imágenes

// Rutas
app.use("/auth", loginRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/roles", rolesRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API Login/Registro con Node + MySQL funcionando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
