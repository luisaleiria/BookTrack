import path from 'path';
import knex from 'knex';

const connection = knex({
  client: 'sqlite3',
  connection: {
    // aqui criará/abrirá o arquivo dev.sqlite3 na pasta database
    filename: path.resolve(__dirname, 'dev.sqlite3'),
  },
  useNullAsDefault: true,   // obrigatório para sqlite3
});

export default connection;
