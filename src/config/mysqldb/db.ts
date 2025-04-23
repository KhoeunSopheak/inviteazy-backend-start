import { createPool, Pool } from 'mysql2';

export const connectMysqlDb = (): Pool => {
  const pool = createPool({
    host: "localhost",
    port: 3303,
    user: "sopheak",
    password: "12345678",
    database: "inviteazy_db",
  });

  return pool;
};
