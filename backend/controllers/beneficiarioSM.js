const db = require('../database')

const consultarBeneficiarioSM = (req, res, next) => {
  console.log('aqui');
  db.select().table('beneficiario')
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
  consultarBeneficiarioSM
};
