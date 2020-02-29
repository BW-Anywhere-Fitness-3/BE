const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  recordFirstLogin
};

function find() {
  return db('clients').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('clients').where(filter);
}

async function add(client) {
  const [id] = await db('clients').insert(client);

  return findById(id);
}

function findById(id) {
  return db('clients')
    .where({ id })
    .first();
}

async function recordFirstLogin(id) {
  console.log(id, "Record First Log in");
  await db('clients')
  .where({ id: id })
  .update({hasLoggedIn: true});
  return;
}