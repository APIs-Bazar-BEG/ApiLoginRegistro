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

// Buscar usuario por email
router.get('/email/:email', (req, res) => usuariosController.getUsuarioByEmail(req, res));

// Configuración multer en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });
const authMiddleware = require("../middlewares/authMiddleware");

// CRUD de usuarios
router.get("/",authMiddleware, getAllUsuarios);
router.get("/:id",authMiddleware, getUsuarioById);
router.post("/",authMiddleware, upload.single("foto"), createUsuario);
router.put("/:id",authMiddleware, upload.single("foto"), updateUsuario);
router.delete("/:id",authMiddleware, deleteUsuario);

module.exports = router;
