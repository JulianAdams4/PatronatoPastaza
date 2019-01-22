const db = require("../database");

const consultarAtenderPorServicioSM = (req, res) => {
  return db.select(
    "beneficiario.id",
    "beneficiario.nombre",
    "beneficiario.apellido",
    "beneficiario.identificacion",
    "atencion.estatenc"
  ).from("beneficiario")
    .join("atencion","beneficiario.id","atencion.id_beneficiario")
    .where({
      id_servicio: 1,
      estatenc: "P",
      fecha: "2018-12-14"
    })
    .then((collection) => {
      return res.status(200).json({
        error: false,
        data: collection
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        data:{ message: err.message }
      });
    });
};

module.exports = {
  consultarAtenderPorServicioSM
};