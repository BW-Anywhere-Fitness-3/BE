exports.up = function(knex) {
    return knex.schema.createTable('instructors', users => {
      users.increments();
  
      users
        .string('username', 128)
        .notNullable()
        .unique();
      users.string('password', 128).notNullable();
      users.boolean('hasLoggedIn');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('instructors');
  };
