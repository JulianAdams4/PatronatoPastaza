const db = require('../database')

const consultarBeneficiarioSM = (req, res, next) => {
  db.select('beneficiario.id','nombre','apellido','identificacion','telefono').from('beneficiario')
  .join('admision','beneficiario.id','admision.id_beneficiario')
  .where('admision.id_proyuni',1)
  .then(function(collection){
    res.json({
      error: false,
      data: collection
    })
  })
  .catch(function(err){
    res.status(500).json({
      error: true,
      data:{
        message:err.message
      }
    })
  })
};

const filtrarBeneficiarioSM = (req, res, next) => {
  db.select('beneficiario.id','nombre','apellido','identificacion','telefono').from('beneficiario')
  .join('admision','beneficiario.id','admision.id_beneficiario')
  .where((qb) => {
    if (req.body.nombre!="") {
      qb.where('nombre', 'like', '%'+req.body.nombre+'%');
    }
    if (req.body.apellido!="") {
      qb.orWhere('apellido', 'like', '%'+req.body.apellido+'%');
    }
    if (req.body.identificacion!="") {
      qb.orWhere('identificacion', 'like', '%'+req.body.identificacion+'%');
    }
  })
  .andWhere('id_proyuni',1)
  .then(function(collection){
    res.json({
      error: false,
      data: collection
    })
  })
  .catch(function(err){
    res.status(500).json({
      error: true,
      data:{
        message:err.message
      }
    })
  })
};

module.exports = {
  consultarBeneficiarioSM,
  filtrarBeneficiarioSM
};
