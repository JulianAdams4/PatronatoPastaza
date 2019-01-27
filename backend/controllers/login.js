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
        contrasena: req.body.contrasena,
        estusua: "A" // Active user
      });
    if (!usuario) 
      return res.status(404).json({ error: true, data: { message: "Usuario o contraseña incorrectos" } });

    if (usuario) {
      const [infoAdicional] = await db
        .select("rol.nombre as nombreRol", "cargo.id_proyuni as id_proyuni")
        .from("cargo")
        .leftJoin("rol", "rol.id", "cargo.id_rol")
        .where({ id_usuario: usuario.id });
      // Return user data without password
      delete usuario.contrasena;
      // Create a token
      const payload = Object.assign(usuario, {
        cargo: infoAdicional.nombreRol,
        id_proyuni: infoAdicional.id_proyuni
      });
      const token = jwt.sign(payload, process.env.SECRET_PASS, {
        expiresIn: process.env.SESSION_DURATION
      });
      req.session = token;
      req.headers["authorization"] = token;
      return res.status(200).json({
        error: false,
        token,
        nombres: `${usuario.nombre} ${usuario.apellido}`,
        rol: infoAdicional.nombreRol
      });
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