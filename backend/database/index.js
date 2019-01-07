/*global process */
require("dotenv").config();

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
});

// psql postgres -c 'drop database patronato'
// psql postgres -c 'create database patronato'
// psql patronato < /home/julian/Documentos/PatronatoPastaza/backend/database/patronato.sql

module.exports = knex;
