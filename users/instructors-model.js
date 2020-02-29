const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('instructors').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('instructors').where(filter);
}

async function add(instructor) {
  const [id] = await db('instructors').insert(instructor);

  return findById(id);
}

function findById(id) {
  return db('instructors')
    .where({ id })
    .first();
}