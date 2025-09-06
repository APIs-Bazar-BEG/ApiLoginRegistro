const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// LOG 5: Imprime la configuración para asegurarte de que las variables .env se cargaron
console.log("Configuración de la base de datos:", dbConfig);

async function getConnection() {
  try {
    // LOG 6: ¿Intenta conectar?
    console.log("-> Intentando conectar a SQL Server...");
    const pool = await sql.connect(dbConfig);
    // LOG 7: Si ves este mensaje, ¡la conexión fue exitosa!
    console.log("✅ Conexión a SQL Server establecida.");
    return pool;
  } catch (err) {
    console.error("❌ Error de conexión a SQL Server:", err);
    throw err;
  }
}

module.exports = { getConnection, sql };
