exports.up = function (knex) {
  return knex.schema.createTable('classes', classes => {
    classes.increments();

    classes
      .string('workoutName', 128)
      .notNullable()
      .unique();
    classes.string('type', 128).notNullable();
    classes.integer('durationMins').notNullable();
    classes.integer('intensityLevel').notNullable();
    classes.string('location', 128).notNullable();
    classes.integer('attendees').notNullable();
    classes.integer('maxAttendees').notNullable();
    classes.dateTime('startTime').defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('classes');
};
