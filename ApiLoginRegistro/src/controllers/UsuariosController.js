const usuariosService = require("../services/UsuariosService");
const fs = require("fs");
const path = require("path");

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

// Crear usuario 
async function createUsuario(req, res) {
  try {
    const { nombre, apellido, email, password, rol_id } = req.body;
    const foto = req.file ? `/uploads/usuarios/${req.file.filename}` : null;

    const usuario = await usuariosService.createUsuario({
      nombre,
      apellido,
      email,
      password,
      rol_id,
      foto,
    });
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Actualizar usuario
async function updateUsuario(req, res) {
  try {
    const { id } = req.params;
    let { nombre, apellido, email, rol_id } = req.body;
    let foto = req.body.foto;

    if (req.file) {
      // Borrar foto antigua si existe
      const usuario = await usuariosService.getUsuarioById(id);
      if (usuario && usuario.foto) {
        const oldPath = path.join(__dirname, "..", usuario.foto);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      foto = `/uploads/usuarios/${req.file.filename}`;
    }

    const updated = await usuariosService.updateUsuario(id, { nombre, apellido, email, rol_id, foto });
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
