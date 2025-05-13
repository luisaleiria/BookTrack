// knexfile.cjs
require('dotenv').config();        // se você precisar das variáveis .env
const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      // Cria o arquivo dev.sqlite3 em src/database
      filename: path.resolve(__dirname, 'src', 'database', 'dev.sqlite3'),
    },
    useNullAsDefault: true,        // obrigatório para sqlite3
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
  },

  test: {
    client: 'sqlite3',
    connection: { filename: ':memory:' },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
  },
};
