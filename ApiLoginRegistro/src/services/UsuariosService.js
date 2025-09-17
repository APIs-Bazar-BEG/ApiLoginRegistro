const pool = require("../db");
const bcrypt = require("bcryptjs");

// Obtener todos los usuarios
async function getAllUsuarios() {
  const [rows] = await pool.query(
    "SELECT id, nombre, apellido, email, rol_id, foto FROM usuarios"
  );
  return rows;
}

// Obtener un usuario por ID
async function getUsuarioById(id) {
  const [rows] = await pool.query(
    "SELECT id, nombre, apellido, email, rol_id, foto FROM usuarios WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

// Crear un usuario (opcional para admin)
async function createUsuario({ nombre, apellido, email, password, rol_id, foto }) {
  const hashedPassword = await bcrypt.hash(password, 12);
  const [result] = await pool.query(
    `INSERT INTO usuarios (nombre, apellido, email, password, rol_id, foto) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nombre, apellido || null, email, hashedPassword, rol_id || 2, foto || null]
  );
  return { id: result.insertId, nombre, email, rol_id: rol_id || 2, foto };
}

// Actualizar usuario
async function updateUsuario(id, { nombre, apellido, email, rol_id, foto }) {
  const [result] = await pool.query(
    "UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, rol_id = ?, foto = ? WHERE id = ?",
    [nombre, apellido, email, rol_id, foto || null, id]
  );
  return result.affectedRows > 0;
}

// Eliminar usuario
async function deleteUsuario(id) {
  const [result] = await pool.query(
    "DELETE FROM usuarios WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
