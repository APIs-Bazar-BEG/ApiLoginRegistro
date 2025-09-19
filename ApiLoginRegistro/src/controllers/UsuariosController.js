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

// Crear usuario 
async function createUsuario(req, res) {
  try {
    const { nombre, apellido, email, password, rol_id } = req.body;
    const foto = req.file ? req.file.buffer : null; // binario

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

    // si no viene foto nueva, la dejamos igual
    let foto = req.file ? req.file.buffer : undefined;

    const updated = await usuariosService.updateUsuario(id, {
      nombre,
      apellido,
      email,
      rol_id,
      foto,
    });

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


// Obtener solo la foto del usuario
async function getFotoUsuario(req, res) {
  try {
    const usuario = await usuariosService.getUsuarioById(req.params.id);
    if (!usuario || !usuario.foto) {
      return res.status(404).send("Foto no encontrada");
    }
    res.set("Content-Type", "image/jpeg"); // o image/png según corresponda
    res.send(Buffer.from(usuario.foto, "base64"));
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
  getFotoUsuario // foto
};
