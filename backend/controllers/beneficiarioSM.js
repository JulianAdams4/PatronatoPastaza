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

const consultarNombreBeneficiarioSM = (req, res, next) => {
  db.select('beneficiario.id','nombre','apellido','identificacion','telefono').from('beneficiario')
  .join('admision','beneficiario.id','admision.id_beneficiario')
  .where('nombre','like','%L%')
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

const consultarAtenderPorServicioSM = (req, res, next) => {
  db.select('beneficiario.id','beneficiario.nombre','beneficiario.apellido','beneficiario.identificacion','atencion.estatenc').from('beneficiario')
  .join('atencion','beneficiario.id','atencion.id_beneficiario')
  .where({
    id_servicio: 1,
    estatenc: 'P',
    fecha: '2018-12-14'
  })
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
  consultarAtenderPorServicioSM,
  consultarBeneficiarioSM,
  consultarNombreBeneficiarioSM
};

//select beneficiario.id,nombre,apellido,identificacion,telefono
//from beneficiario inner join admision on beneficiario.id = admision.id_beneficiario
//inner join proyuni on admision.id_proyuni = proyuni.id where proyuni.id=2
