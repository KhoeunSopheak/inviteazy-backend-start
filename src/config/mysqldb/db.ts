import { createPool, Pool } from 'mysql2';

export const connectMysqlDb = (): Pool => {
  const pool = createPool({
    user: process.env.MYSQL_USER,   
    host: process.env.HOST_DB,            
    database: process.env.MYSQL_DATABASE,   
    password: process.env.MYSQL_ROOT_PASSWORD, 
    port: Number(process.env.MYSQL_PORT)
  });

  return pool;
};
