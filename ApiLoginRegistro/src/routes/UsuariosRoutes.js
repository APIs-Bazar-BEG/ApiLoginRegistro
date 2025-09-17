const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
} = require("../controllers/UsuariosController");

// Configuración multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/usuarios"); // carpeta en la raíz
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

// CRUD de usuarios
router.get("/", getAllUsuarios);
router.get("/:id", getUsuarioById);
router.post("/", upload.single("foto"), createUsuario); // 'foto' es el campo del form-data
router.put("/:id", upload.single("foto"), updateUsuario);
router.delete("/:id", deleteUsuario);

module.exports = router;
