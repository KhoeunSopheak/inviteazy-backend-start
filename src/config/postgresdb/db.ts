import { Pool } from "pg";

export const connectPostgresDb = (): Pool => {
  const pool = new Pool({
    user: process.env.POSTGRES_USER,   
    host: process.env.HOST_DB,            
    database: process.env.POSTGRES_DB,   
    password: process.env.POSTGRES_PASSWORD, 
    port: Number(process.env.PORT)        
  });
  
  return pool;
};
