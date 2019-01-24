const db = require('../database')

/*
if(req.body.nombre != '' && req.body.apellido != '' &&
   req.body.nacionalidad != '' && req.body.grupoCultural != '' && req.body.sexo != '' &&
   req.body.zona != '' && req.body.estadoCivil != '' && req.body.resNombre != '' &&
   req.body.resApellido != '' && req.body.resParentesco != ''){

db('beneficiario').insert({
  nombre: req.body.nombre,
  apellido: req.body.apellido,
  identificacion: req.body.identificacion,
  direccion: req.body.direccion,
  barrio: req.body.barrio,
  zona: req.body.zona,
  telefono: req.body.telefono,
  fechaNacimiento: req.body.fechaNacimiento,
  edad: req.body.edad,
  lugarNacimiento: req.body.lugarNacimiento,
  nacionalidad: req.body.nacionalidad,
  grupoCultural: req.body.grupoCultural,
  sexo: req.body.sexo,
  estadoCivil: req.body.estadoCivil,
  instruccion: req.body.instruccion,
  empresa: req.body.empresa,
  ocupacion: req.body.ocupacion,
  seguro: req.body.seguro,
  referido: req.body.referido,
  id_parroquia: req.body.parroquia
})
.then(function(id){
  db('responsable').insert({
    nombre: req.body.resNombre,
    apellido: req.body.resApellido,
    parentesco: req.body.resParentesco,
    telefono: req.body.resTelefono,
    direccion: req.body.resDireccion,
    id_beneficiario: id,
  })
  .then(function(id){
    res.json({
      error: false,
      data: id
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
})
.catch(function(err){
  res.status(500).json({
    error: true,
    data:{
      message:err.message
    }
  })
})
*/

const consultarBeneficiarioPorID = (req, res, next) => {
  db.select('beneficiario.nombre','beneficiario.apellido','beneficiario.identificacion','beneficiario.telefono',
            'beneficiario.direccion','beneficiario.barrio', 'parroquia.nombre as parroquia', 'canton.nombre as canton', 'provincia.nombre as provincia',
            'beneficiario.zona', 'beneficiario.fechanacimiento', 'beneficiario.lugarnacimiento', 'beneficiario.nacionalidad', 'beneficiario.grupocultural',
            'beneficiario.sexo', 'beneficiario.estadocivil', 'beneficiario.instruccion', 'beneficiario.ocupacion','beneficiario.empresa','beneficiario.seguro',
            'beneficiario.referido','responsable.nombre as resNombre', 'responsable.apellido as resApellido', 'responsable.parentesco as resParentesco',
            'responsable.direccion as resdireccion', 'responsable.telefono as resTelefono')
  .from('beneficiario')
  .join('responsable','beneficiario.id','responsable.id_beneficiario')
  .join('parroquia','beneficiario.id_parroquia','parroquia.id')
  .join('canton','canton.id','parroquia.id_canton')
  .join('provincia','provincia.id','canton.id_provincia')
  .where('beneficiario.id',req.params.idBeneficiario)
  .limit(1)
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

const ingresarBeneficiarioSM = (req, res, next) => {
  console.log(req.body.nombre);
  console.log(req.body.apellido);
  if(req.body.nombre == '' && req.body.apellido == ''){
    console.log(req.body.nombre);
    res.status(500).json({
      error: true,
      data:{
        message:'Información Faltante'
      }
    });
  }else{
    console.log(req.body.apellido);
    res.status(200).json({
      error: false
    });
  }
};

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

const filtrarBeneficiario = (req, res, next) => {
  db.select('beneficiario.id','nombre','apellido','identificacion','telefono').from('beneficiario')
  .join('admision', 'admision.id_beneficiario', 'beneficiario.id')
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
  .whereNot('admision.id_proyuni',1)
  .limit(10)
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

const consultarProvincia = (req, res, next) => {
  db.select('id','nombre').from('provincia')
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

const consultarCanton = (req, res, next) => {
  db.select('id','nombre').from('canton')
  .where('id_provincia',req.params.id)
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

const consultarParroquia = (req, res, next) => {
  db.select('id','nombre').from('parroquia')
  .where('id_canton',req.params.id)
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

const consultarNacionalidad = (req, res, next) => {
  db.select('nombre').from('nacionalidad')
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

const consultarGrupoCultural = (req, res, next) => {
  db.select('nombre').from('grupocultural')
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

const consultarEstadoCivil = (req, res, next) => {
  db.select('nombre').from('estadocivil')
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

const consultarInstruccion = (req, res, next) => {
  db.select('nombre').from('instruccion')
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

const consultarParentesco = (req, res, next) => {
  db.select('nombre').from('parentesco')
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
  consultarBeneficiarioPorID,
  ingresarBeneficiarioSM,
  consultarBeneficiarioSM,
  filtrarBeneficiarioSM,
  filtrarBeneficiario,
  consultarProvincia,
  consultarCanton,
  consultarParroquia,
  consultarNacionalidad,
  consultarGrupoCultural,
  consultarEstadoCivil,
  consultarInstruccion,
  consultarParentesco
};
