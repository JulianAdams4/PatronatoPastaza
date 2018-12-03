const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'julian',
    password: '1234',
    database: 'patronato'
  }
});

module.exports = knex;
