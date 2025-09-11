const rolesService = require("../services/RolesService");

// Obtener todos los roles
async function getAllRoles(req, res) {
  try {
    const roles = await rolesService.getAllRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Obtener rol por ID
async function getRolById(req, res) {
  try {
    const rol = await rolesService.getRolById(req.params.id);
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });
    res.json(rol);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Crear rol
async function createRol(req, res) {
  try {
    const rol = await rolesService.createRol(req.body);
    res.status(201).json(rol);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Actualizar rol
async function updateRol(req, res) {
  try {
    const updated = await rolesService.updateRol(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Rol no encontrado" });
    res.json({ msg: "Rol actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Eliminar rol
async function deleteRol(req, res) {
  try {
    const deleted = await rolesService.deleteRol(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Rol no encontrado" });
    res.json({ msg: "Rol eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol
};
