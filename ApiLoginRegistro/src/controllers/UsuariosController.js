const usuariosService = require("../services/UsuariosService");

// Obtener todos los usuarios
async function getAllUsuarios(req, res) {
  try {
    const usuarios = await usuariosService.getAllUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Obtener un usuario por ID
async function getUsuarioById(req, res) {
  try {
    const usuario = await usuariosService.getUsuarioById(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Crear usuario (admin)
async function createUsuario(req, res) {
  try {
    const usuario = await usuariosService.createUsuario(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Actualizar usuario
async function updateUsuario(req, res) {
  try {
    const updated = await usuariosService.updateUsuario(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ msg: "Usuario actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Eliminar usuario
async function deleteUsuario(req, res) {
  try {
    const deleted = await usuariosService.deleteUsuario(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ msg: "Usuario eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
