const db = require('../database')

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
  consultarAtenderPorServicioSM
};
