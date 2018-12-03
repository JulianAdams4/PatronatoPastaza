const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'erick',
    password: 'near',
    database: 'patronato'
  }
});

module.exports = knex;
