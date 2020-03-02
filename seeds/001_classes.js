exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {id,
          className: 'Spin',
          type: 'Spin',
          durationMins: '60',
          intesityLevel: 'hard',
          location: 'Spin Room',
          attendees: '12',
          maxAttendees: '15',
          startTime: '2020-03-02 16:00:00'
        },
      ]);
    });
};