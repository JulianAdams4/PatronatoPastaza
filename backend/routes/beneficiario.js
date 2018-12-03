const express = require('express');
const router = express.Router();
const db = require('../database')

router.get('/', function(req, res){
  db.select().from('beneficiario').then(function(data){
    res.send(data);
  });
});

router.post('/',function(req,res){
  db.insert(req.body).returning('*').into('beneficiario').then(function(data){
    res.send(data);
  });
});

module.exports = router;
