const { getConnection, sql } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser({ nombre, apellido, email, password, rol_id }) {
  const pool = await getConnection();

  // Verificar si el email ya existe
  const checkUser = await pool
    .request()
    .input("email", sql.VarChar, email)
    .query("SELECT * FROM usuarios WHERE email = @email");

  if (checkUser.recordset.length > 0) {
    throw new Error("El email ya está registrado");
  }

  // Hashear contraseña
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Insertar usuario
  await pool
    .request()
    .input("nombre", sql.VarChar, nombre)
    .input("apellido", sql.VarChar, apellido || null)
    .input("email", sql.VarChar, email)
    .input("password", sql.VarChar, hashedPassword)
    .input("rol_id", sql.Int, rol_id || 2)
    .query(
      `INSERT INTO usuarios (nombre, apellido, email, password, rol_id) 
       VALUES (@nombre, @apellido, @email, @password, @rol_id)`
    );

  return { msg: "Usuario registrado correctamente ✅" };
}

async function loginUser({ email, password }) {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input("email", sql.VarChar, email)
    .query("SELECT * FROM usuarios WHERE email = @email");

  if (result.recordset.length === 0) {
    throw new Error("Usuario no encontrado");
  }

  const usuario = result.recordset[0];

  // Comparar contraseñas
  const isMatch = bcrypt.compareSync(password, usuario.password);
  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }

  // Crear token
  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol_id },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return {
    msg: "Login exitoso ✅",
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol_id,
    },
  };
}

module.exports = { registerUser, loginUser };
