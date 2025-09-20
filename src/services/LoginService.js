const pool = require("../db"); // tu pool de MySQL
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

async function registerUser({ nombre, apellido, email, password, rol_id }) {
  if (!nombre || !email || !password || !rol_id) {
    throw new Error("Faltan datos obligatorios");
  }

  const [existing] = await pool.query(
    "SELECT id FROM usuarios WHERE email = ?",
    [email]
  );
  if (existing.length > 0) {
    throw new Error("El email ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const [result] = await pool.query(
    "INSERT INTO usuarios (nombre, apellido, email, password, rol_id) VALUES (?, ?, ?, ?, ?)",
    [nombre, apellido || null, email, hashedPassword, rol_id]
  );

  return { id: result.insertId, nombre, email, rol_id };
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new Error("Faltan email o contraseña");
  }

  const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [
    email,
  ]);
  if (rows.length === 0) {
    throw new Error("Usuario no encontrado");
  }

  const user = rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign(
    { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id },
  };
}

module.exports = { registerUser, loginUser };
