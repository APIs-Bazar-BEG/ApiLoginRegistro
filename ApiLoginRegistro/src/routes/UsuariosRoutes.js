const express = require("express");
const router = express.Router();
const multer = require("multer");
const { 
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getFotoUsuario
} = require("../controllers/UsuariosController");

// Nueva ruta para obtener la foto
router.get("/:id/foto", getFotoUsuario);

// Configuración multer en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CRUD de usuarios
router.get("/", getAllUsuarios);
router.get("/:id", getUsuarioById);
router.post("/", upload.single("foto"), createUsuario);
router.put("/:id", upload.single("foto"), updateUsuario);
router.delete("/:id", deleteUsuario);

module.exports = router;
