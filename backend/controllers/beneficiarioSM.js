const db = require("../database");

const consultarBeneficiarioSM = (req, res) => {
  db.select().table("beneficiario")
    .then((collection) => {
      return res.json({
        error: false,
        data: collection
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        data:{
          message:err.message
        }
      });
    });
};

module.exports = {
  consultarBeneficiarioSM
};

//select beneficiario.id,nombre,apellido,identificacion,telefono
//from beneficiario inner join admision on beneficiario.id = admision.id_beneficiario
//inner join proyuni on admision.id_proyuni = proyuni.id where proyuni.id=2
