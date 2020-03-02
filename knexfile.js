// Update with your config settings.

module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   },
  //   useNullAsDefault: true
  // },

  development: {
    client: 'postgresql',
    connection: {
      host: 'drona.db.elephantsql.com',
      database: 'uxvnhtzc',
      user:     'uxvnhtzc',
      password: 'JVvnOqbZE_2y2508kH3WaYnrBJrdghqo'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  
  staging: {
    client: 'postgresql',
    connection: {
      host: 'drona.db.elephantsql.com',
      database: 'uxvnhtzc',
      user:     'uxvnhtzc',
      password: 'JVvnOqbZE_2y2508kH3WaYnrBJrdghqo'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'drona.db.elephantsql.com',
      database: 'uxvnhtzc',
      user:     'uxvnhtzc',
      password: 'JVvnOqbZE_2y2508kH3WaYnrBJrdghqo'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
