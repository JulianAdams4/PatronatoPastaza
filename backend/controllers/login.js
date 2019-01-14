/*global process */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../database");


const login = async (req, res) => {
  res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
  res.header("Expires", "Fri, 31 Dec 1998 12:00:00 GMT");

  try {
    const [usuario] = await db
      .select()
      .table("usuario")
      .where({
        correo: req.body.correo,
        contrasena: req.body.contrasena
      });
    if (!usuario) 
      return res.status(404).json({ error: true, data: { message: "Usuario o contraseña incorrectos" } });

    if (usuario) {
      const proyectos = await db
        .select("proyecto.nombre")
        .from("proyecto")
        .leftJoin("proyuni", "proyecto.id", "proyuni.id_proyecto")
        .leftJoin("cargo", "cargo.id_proyuni", "proyuni.id")
        .leftJoin("usuario", "usuario.id", "cargo.id_usuario")
        .where("usuario.id", usuario.id);
      // Return user data without password
      delete usuario.contrasena;
      // Create a token
      const token = jwt.sign(usuario, process.env.SECRET_PASS, {
        expiresIn: process.env.SESSION_DURATION
      });
      req.session = token;
      req.headers["authorization"] = token;
      return res.status(200).send({ error: false, token, proyectos });
    }      
  } catch (err) {
    return res.status(500).json({
      error: true,
      data:{ message: err.message }
    });    
  }
};


const logout = (req, res) => {
  res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
  res.header("Expires", "Fri, 31 Dec 1998 12:00:00 GMT");
  req.session = null;
  delete req.session;
  delete req.headers.authorization;
  return res.status(200).json({ error: false, token: null });
};


module.exports = { login, logout };