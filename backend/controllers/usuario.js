/*global process */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../database");

const obtenerProyectos = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: true, message: "Unauthorized" });
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_PASS);
    let proyectos = [];

    if (data) {
      proyectos = await db
        .select("proyecto.*")
        .from("proyecto")
        .leftJoin("proyuni", "proyecto.id", "proyuni.id_proyecto")
        .leftJoin("cargo", "cargo.id_proyuni", "proyuni.id")
        .leftJoin("usuario", "usuario.id", "cargo.id_usuario")
        .where("usuario.id", data.id);
    }
    return res.status(200).json({ error: false, data: { proyectos } });
    
  } catch (err) {
    return res.status(403).json({ error: true, message: "Unauthorized" });
  }
};

module.exports = { obtenerProyectos };