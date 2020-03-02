const knex = require('knex');

const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig.development);
// module.exports = knex(process.env.MACHINE === "Dan" ? process.env.STAGING === "y"  ? knexConfig.staging : knexConfig.development : knexConfig.production);