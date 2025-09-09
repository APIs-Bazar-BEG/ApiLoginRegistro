const { registerUser, loginUser } = require("../services/LoginService");

async function register(req, res) {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { register, login };
