import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
  }
};