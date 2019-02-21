const db = require("../database");

const consultarAtenderPorServicioSM = (req, res) => {
  const whereParams = {
    id_servicio: req.body.id_servicio,
    estatenc: "P",
    fecha: req.body.fecha
  };
  return db
    .select("*")
    .from("beneficiario")
    .join("atencion","beneficiario.id","atencion.id_beneficiario")
    .where(whereParams)
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

const marcarAsistenciaACitaSM = (req, res) => {
  return db
    .table("atencion")
    .where({ id: req.body.id_cita })
    .update({ estatenc: "A" })
    .then(() => {
      return res.status(200).json({
        error: false,
        data: { message: "Ok" }
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: true,
        data:{ message: err.message }
      });
    });
};

const eliminarCitaSM = (req, res) => {
  return db
    .table("atencion")
    .where({ id: req.body.id_cita })
    .del()
    .then(() => {
      return res.status(200).json({
        error: false,
        data: { message: "Ok" }
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: true,
        data:{ message: err.message }
      });
    });
};

const consultarEspecialista = (req, res) => {
  db.select("usuario.id","usuario.nombre","usuario.apellido").from("usuario")
    .join("cargo","usuario.id","cargo.id_usuario")
    .join("rol","rol.id","cargo.id_rol")
    .where({
      "rol.id_servicio":req.params.idServicio,
      "usuario.estusua":"A"
    })
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

const consultarServiciosSM = (req, res) => {
  const id_proyuni = req.headers["proyuni"];
  return db
    .select("servicio.id","tipo")
    .from("cargo")
    .join("rol","cargo.id_rol","rol.id")
    .join("servicio","rol.id_servicio","servicio.id")
    .where({
      id_usuario: 3,
      "cargo.id_proyuni": id_proyuni
    })
    .then(async collection => {
      if(collection[0].id==1){
        await db.select("id","tipo").from("servicio")
          .where("id_proyuni", id_proyuni)
          .whereNot("id",1)
          .then(collection2 => {
            return res.status(200).json({
              error: false,
              data: collection2
            });
          })
          .catch(err => {
            return res.status(500).json({
              error: true,
              data:{ message: err.message }
            });
          });
      }else{
        return res.status(200).json({
          error: false,
          data: collection
        });
      }
    })
    .catch(function(err){
      return res.status(500).json({
        error: true,
        data:{ message: err.message }
      });
    });
};

const consultarExoneracion = (req, res) => {
  return db.select("nombre")
    .from("tipoexoneracion")
    .then(function(collection){
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

const crearCitaSM = async (req, res) => {
  return db
    .table("atencion")
    .insert(req.body)
    .then(function(id){
      return res.status(200).json({
        error: false,
        data: id
      });
    })
    .catch(function(err){
      return res.status(500).json({
        error: true,
        data:{ message: err.message }
      });
    });

};

module.exports = {
  consultarAtenderPorServicioSM,
  consultarEspecialista,
  consultarServiciosSM,
  consultarExoneracion,
  marcarAsistenciaACitaSM,
  eliminarCitaSM,
  crearCitaSM
};