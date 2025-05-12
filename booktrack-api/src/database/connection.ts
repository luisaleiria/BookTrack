
import knex from 'knex';
const connection = knex({
    client: 'pg', // ou 'mysql', dependendo do banco
    connection: {
      host: 'localhost',
      user: 'seu_usuario',
      password: 'sua_senha',
      database: 'seu_banco_de_dados',
    },
  });
  
  export default connection;