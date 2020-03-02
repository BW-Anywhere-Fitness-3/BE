const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructors').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('instructors').insert([
        {username: 'instructors', password: bcrypt.hashSync('password', 8)},
      ]);
    });
};
