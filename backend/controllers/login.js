/*global process */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../database");


const login = (req, res) => {
  db
    .select()
    .table("usuario")
    .where({
      correo: req.body.correo,
      contrasena: req.body.contrasena
    })
    .then(response => {
      const [user] = response;
      if (!user) return res.json({ error: true, data: { message: "Usuario o contraseña incorrectos" } });

      if (user) {
        // Return user data without password
        delete user.contrasena;
        // Create a token
        const token = jwt.sign(user, process.env.SECRET_PASS, {
          expiresIn: process.env.SESSION_DURATION
        });
        req.session = token;
        return res.status(200).send({ error: false, token });
      }
    })
    .catch((err) => {
      return res.json({
        error: true,
        data:{ message: err.message }
      });
    });
};


const logout = (req, res) => {
  req.session = null;
  delete req.session;
  return res.status(200).json({ error: false, token: null });
};


module.exports = { login, logout };