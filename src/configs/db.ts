import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test_db',
  waitForConnections: true,
  connectionLimit: 10,
});

export const db = drizzle(pool);
