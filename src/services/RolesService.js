const pool = require("../config/db");

// Obtener todos los roles
async function getAllRoles() {
  const [rows] = await pool.query("SELECT id, nombre FROM roles");
  return rows;
}

// Obtener un rol por ID
async function getRolById(id) {
  const [rows] = await pool.query("SELECT id, nombre FROM roles WHERE id = ?", [id]);
  return rows[0] || null;
}

// Crear rol
async function createRol({ nombre }) {
  const [result] = await pool.query("INSERT INTO roles (nombre) VALUES (?)", [nombre]);
  return { id: result.insertId, nombre };
}

// Actualizar rol
async function updateRol(id, { nombre }) {
  const [result] = await pool.query("UPDATE roles SET nombre = ? WHERE id = ?", [nombre, id]);
  return result.affectedRows > 0;
}

// Eliminar rol
async function deleteRol(id) {
  const [result] = await pool.query("DELETE FROM roles WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol
};
