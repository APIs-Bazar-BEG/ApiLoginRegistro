const express = require("express");
const router = express.Router();
const multer = require("multer");
const usuariosController = require('../controllers/UsuariosController');
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
const authMiddleware = require("../middlewares/authMiddleware");

// Ruta pública: buscar usuario por email (antes de :id)
router.get("/email/:email", usuariosController.getUsuarioByEmail);

// CRUD de usuarios
router.get("/", authMiddleware, getAllUsuarios);
router.get("/:id", authMiddleware, getUsuarioById);
router.post("/", upload.single("foto"), createUsuario);
router.put("/:id", authMiddleware, upload.single("foto"), updateUsuario);
router.delete("/:id", authMiddleware, deleteUsuario);

module.exports = router;
