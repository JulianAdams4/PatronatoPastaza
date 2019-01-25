const db = require('../database')

const consultarEspecialista = (req, res, next) => {
  db.select('usuario.id','usuario.nombre','usuario.apellido').from('usuario')
  .join('cargo','usuario.id','cargo.id_usuario')
  .join('rol','rol.id','cargo.id_rol')
  .where({
    'rol.id_servicio':req.params.idServicio,
    'usuario.estusua':'A'
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

const consultarAtenderPorServicioSM = (req, res, next) => {
  db.select('beneficiario.id','beneficiario.nombre','beneficiario.apellido','beneficiario.identificacion','atencion.estatenc').from('beneficiario')
  .join('atencion','beneficiario.id','atencion.id_beneficiario')
  .where({
    id_servicio: 1,
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

const consultarServiciosSM = (req, res, next) => {
  db.select('servicio.id','tipo').from('cargo')
  .join('rol','cargo.id_rol','rol.id')
  .join('servicio','rol.id_servicio','servicio.id')
  .where({
    id_usuario: 2,
    'cargo.id_proyuni': 1
  })
  .then(function(collection){
    if(collection[0].id==1){
      db.select('id','tipo').from('servicio')
      .where('id_proyuni',1)
      .whereNot('id',1)
      .then(function(collection){
        res.status(200).json({
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
    }else{
      res.status(200).json({
        error: false,
        data: collection
      })
    }
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

const consultarExoneracion = (req, res, next) => {
  db.select('nombre').from('tipoexoneracion')
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
  consultarEspecialista,
  consultarAtenderPorServicioSM,
  consultarServiciosSM,
  consultarExoneracion
};
