const express = require("express");
const router = express.Router();
const {
  getAllRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol
} = require("../controllers/RolesController");
const authMiddleware = require("../middlewares/authMiddleware");


// CRUD de roles

router.get("/",authMiddleware, getAllRoles);
router.get("/:id",authMiddleware, getRolById);
router.post("/",authMiddleware, createRol);
router.put("/:id",authMiddleware, updateRol);
router.delete("/:id",authMiddleware, deleteRol);

module.exports = router;
