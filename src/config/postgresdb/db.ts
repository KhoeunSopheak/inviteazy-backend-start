import { Pool } from "pg";

export const connectPostgresDb = (): Pool => {
  const pool = new Pool({
    user: "sopheak",
    host: "localhost",
    database: "inviteazy_db",
    password: "12345678",
    port: 5444,
  });
  return pool;
};
