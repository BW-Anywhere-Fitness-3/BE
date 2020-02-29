const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  updateClass,
  del,
  put
};

function find() {
  return db('classes');
}

function findBy(filter) {
  return db('classes').where(filter);
}

async function add(classInfo) {
  const [id] = await db('classes').insert(classInfo);

  return findById(id);
}

function findById(id) {
  return db('classes')
    .where({ id })
    .first();
}

async function updateClass(classInfo) {
  await db('classes')
  .where({ id: classInfo.id })
  .update(classInfo);
  return findById(classInfo.id);
}

function del(id) {
  return db('classes')
  .where({ id })
  .delete();
}

function put(id, classInfo) {
  classInfo.id = id;
  return updateClass(classInfo);
}