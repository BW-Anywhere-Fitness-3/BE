const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clients').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([
        {username: 'clients', password: bcrypt.hashSync('password', 8)},
      ]);
    });
};
