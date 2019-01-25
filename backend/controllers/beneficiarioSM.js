const db = require("../database");


/*
if(req.body.nombre != '' && req.body.apellido != '' && req.body.edad != '' &&
   req.body.nacionalidad != '' && req.body.grupoCultural != '' && req.body.sexo != '' &&
   req.body.zona != '' && req.body.estadoCivil != '' && req.body.resNombre != '' &&
   req.body.resApellido != '' && req.body.resParentesco != '')
*/

const ingresarBeneficiarioSM = async (req, res) => {
  const tieneNombres = req.body.nombre !== "";
  const tieneApellidos = req.body.apellido !== "";
  const tieneEdad = req.body.edad !== "";
  const tieneNacionalidad = req.body.nacionalidad !== "";
  const tieneGrupoCultural = req.body.grupoCultural !== "";
  const tieneSexo =  req.body.sexo !== "";
  const tieneZona =  req.body.zona !== "";
  const tieneEstadoCivil =  req.body.estadoCivil !== "";
  const tieneResNombre =  req.body.resNombre !== "";
  const tieneResApellido =  req.body.resApellido !== "";
  const tieneResParentezco =  req.body.resParentesco !== "";
  const tieneTodosLosCampos = [
    tieneNombres,
    tieneApellidos,
    tieneEdad,
    tieneNacionalidad,
    tieneGrupoCultural,
    tieneSexo,
    tieneZona,
    tieneEstadoCivil,
    tieneResNombre,
    tieneResApellido,
    tieneResParentezco
  ];
  if (tieneTodosLosCampos.includes(false)) {
    return res.status(422).json({
      error: true,
      data:{ message: "Información Faltante" }
    });
  }

  return await db.transaction(async trx => {
    const [idBeneficiario] = await trx("beneficiario").insert({
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
    });
    if (!idBeneficiario) {
      return res.status(500).json({
        error: true,
        data:{ message: "Error al guardar el beneficiario" }
      });
    }
  
    const [idResponsable] = await trx("responsable").insert({
      nombre: req.body.resNombre,
      apellido: req.body.resApellido,
      parentesco: req.body.resParentesco,
      telefono: req.body.resTelefono,
      direccion: req.body.resDireccion,
      id_beneficiario: idBeneficiario,
    });
    if (!idResponsable) {
      return res.status(500).json({
        error: true,
        data:{ message: "Error al guardar los datos del responsable" }
      });
    }

    const [idAdmision] = await trx("admision").insert({
      id_proyuni: "1", // !!!!
      id_beneficiario: idBeneficiario
    });
    if (!idAdmision) {
      return res.status(500).json({
        error: true,
        data:{ message: "Error al guardar los datos de admisión" }
      });
    }

    return res.status(200).json({
      error: false,
      data:{ message: "OK" }
    });
  }); // End trx
};

const consultarBeneficiarioSM = (req, res) => {
  return db.select(
    "beneficiario.id",
    "nombre",
    "apellido",
    "identificacion",
    "telefono"
  ).from("beneficiario")
    .join(
      "admision",
      "beneficiario.id",
      "admision.id_beneficiario"
    )
    .where("admision.id_proyuni", 1)
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

const filtrarBeneficiarioSM = (req, res) => {
  return db.select(
    "beneficiario.id",
    "nombre",
    "apellido",
    "identificacion",
    "telefono"
  ).from("beneficiario")
    .join(
      "admision",
      "beneficiario.id",
      "admision.id_beneficiario"
    )
    .where((qb) => {
      if ( req.body.nombre !== "" ) {
        qb.where("nombre", "like", `%${req.body.nombre}%`);
      }
      if  (req.body.apellido!== "" ) {
        qb.orWhere("apellido", "like", `%${req.body.apellido}%`);
      }
      if ( req.body.identificacion !== "" ) {
        qb.orWhere("identificacion", "like", `%${req.body.identificacion}%`);
      }
    })
    .andWhere("id_proyuni", 1)
    .then((collection) => {
      return res.status(200).json({
        error: false,
        data: collection
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        data:{ message:err.message }
      });
    });
};

const filtrarBeneficiario = (req, res) => {
  return db.select(
    "beneficiario.id",
    "nombre",
    "apellido",
    "identificacion",
    "telefono"
  ).from("beneficiario")
    .where((qb) => {
      if ( req.body.nombre !== "" ) {
        qb.where("nombre", "like", `%${req.body.nombre}%`);
      }
      if ( req.body.apellido !== "" ) {
        qb.orWhere("apellido", "like", `%${req.body.apellido}%`);
      }
      if ( req.body.identificacion !== "" ) {
        qb.orWhere("identificacion", "like", `%${req.body.identificacion}%`);
      }
    })
    .then(function(collection){
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

const consultarProvincia = (req, res) => {
  return db
    .select(
      "id",
      "nombre"
    )
    .from("provincia")
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

const consultarCanton = (req, res) => {
  return db
    .select("id","nombre")
    .from("canton")
    .where("id_provincia", req.params.idProvincia)
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

const consultarParroquia = (req, res) => {
  return db
    .select("id", "nombre")
    .from("parroquia")
    .where("id_canton", req.params.idCanton)
    .then((collection) => {
      return res.status(200).json({
        error: false,
        data: collection
      });
    })
    .catch(function(err){
      return res.status(500).json({
        error: true,
        data:{ message: err.message }
      });
    });
};

const consultarNacionalidad = (req, res) => {
  db.select("nombre").from("nacionalidad")
    .then(function(collection){
      res.json({
        error: false,
        data: collection
      });
    })
    .catch(function(err){
      res.status(500).json({
        error: true,
        data:{
          message:err.message
        }
      });
    });
};

const consultarGrupoCultural = (req, res) => {
  db.select("nombre").from("grupocultural")
    .then(function(collection){
      res.json({
        error: false,
        data: collection
      });
    })
    .catch(function(err){
      res.status(500).json({
        error: true,
        data:{
          message:err.message
        }
      });
    });
};

const consultarEstadoCivil = (req, res) => {
  db.select("nombre").from("estadocivil")
    .then(function(collection){
      res.json({
        error: false,
        data: collection
      });
    })
    .catch(function(err){
      res.status(500).json({
        error: true,
        data:{
          message:err.message
        }
      });
    });
};

const consultarInstruccion = (req, res) => {
  db.select("nombre").from("instruccion")
    .then(function(collection){
      res.json({
        error: false,
        data: collection
      });
    })
    .catch(function(err){
      res.status(500).json({
        error: true,
        data:{
          message:err.message
        }
      });
    });
};

const consultarParentesco = (req, res) => {
  db.select("nombre").from("parentesco")
    .then(function(collection){
      res.json({
        error: false,
        data: collection
      });
    })
    .catch(function(err){
      res.status(500).json({
        error: true,
        data:{
          message:err.message
        }
      });
    });
};

const consultarBeneficiarioPorID = (req, res) => {
  db.select("beneficiario.nombre","beneficiario.apellido","beneficiario.identificacion","beneficiario.telefono",
    "beneficiario.direccion","beneficiario.barrio", "parroquia.nombre as parroquia", "canton.nombre as canton", "provincia.nombre as provincia",
    "beneficiario.zona", "beneficiario.fechanacimiento", "beneficiario.lugarnacimiento", "beneficiario.nacionalidad", "beneficiario.grupocultural",
    "beneficiario.sexo", "beneficiario.estadocivil", "beneficiario.instruccion", "beneficiario.ocupacion","beneficiario.empresa","beneficiario.seguro",
    "beneficiario.referido","responsable.nombre as resNombre", "responsable.apellido as resApellido", "responsable.parentesco as resParentesco",
    "responsable.direccion as resdireccion", "responsable.telefono as resTelefono")
    .from("beneficiario")
    .join("responsable","beneficiario.id","responsable.id_beneficiario")
    .join("parroquia","beneficiario.id_parroquia","parroquia.id")
    .join("canton","canton.id","parroquia.id_canton")
    .join("provincia","provincia.id","canton.id_provincia")
    .where("beneficiario.id",req.params.idBeneficiario)
    .limit(1)
    .then(function(collection){
      res.json({
        error: false,
        data: collection
      });
    })
    .catch(function(err){
      res.status(500).json({
        error: true,
        data:{
          message:err.message
        }
      });
    });
};

module.exports = {
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
  consultarParentesco,
  consultarBeneficiarioPorID
};