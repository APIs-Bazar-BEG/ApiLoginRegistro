const express = require("express");
const router = express.Router();
const {
  getAllRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol
} = require("../controllers/RolesController");

// CRUD de roles
router.get("/", getAllRoles);
router.get("/:id", getRolById);
router.post("/", createRol);
router.put("/:id", updateRol);
router.delete("/:id", deleteRol);

module.exports = router;
