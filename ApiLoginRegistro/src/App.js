const express = require("express");
require("dotenv").config();

const loginRoutes = require("./routes/LoginRoutes");
const usuariosRoutes = require("./routes/UsuariosRoutes");
const rolesRoutes = require("./routes/RolesRoutes");

const app = express();
app.use(express.json());

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
