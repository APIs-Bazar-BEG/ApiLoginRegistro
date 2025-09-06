const express = require("express");
require("dotenv").config();
const loginRoutes = require("./routes/LoginRoutes");


const app = express();
app.use(express.json());

// Rutas
app.use("/auth", loginRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API Login/Registro con Node + SQL Server funcionando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
