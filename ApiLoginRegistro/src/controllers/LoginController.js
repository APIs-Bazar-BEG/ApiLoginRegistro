const { registerUser, loginUser } = require("../services/LoginService");

async function register(req, res) {
  // LOG 1: ¿Llega la petición al controlador?
  console.log("-> Petición recibida en el controlador de registro.");
  console.log("Body recibido:", req.body);

  try {
    // LOG 2: ¿Intenta llamar al servicio?
    console.log("-> Intentando registrar usuario en el servicio...");
    const result = await registerUser(req.body);

    // LOG 3: ¿El servicio respondió correctamente?
    console.log("<- El servicio respondió. Enviando JSON al cliente.");
    res.status(201).json(result); // Es buena práctica usar 201 para creación exitosa
  } catch (err) {
    // LOG 4: ¿Ocurrió un error?
    console.error("<- Ocurrió un error en el servicio:", err.message);
    res.status(400).json({ error: err.message });
  }
}

// Haz lo mismo para la función de login si quieres probarla también
async function login(req, res) {
  console.log("-> Petición recibida en el controlador de login.");
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (err) {
    console.error("<- Ocurrió un error en el servicio de login:", err.message);
    res.status(400).json({ error: err.message });
  }
}

module.exports = { register, login };
