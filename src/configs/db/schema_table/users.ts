import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

// Definisikan tabel dengan tipe data yang sesuai
export const usersTable = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),   // Menggunakan int untuk integer
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 255 }).notNull(),
});
