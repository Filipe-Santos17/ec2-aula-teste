import { Knex, knex } from 'knex';
import { env } from '../env/index';

export const config: Knex.Config = {
  client: env.DB_CLIENT,
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    database: env.DB_NAMEDB,
    filename: "./store.db"
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations',
  }
}
  
export const db = knex(config)