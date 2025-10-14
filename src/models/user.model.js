
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
export const user=pgTable('users',{
  id:serial('id').primaryKey(),
  name:varchar('name',{length:255}).notNull(),
  password:varchar('password',{length:255}).notNull(),
  role:varchar('role',{length:255}).notNull(),
  email:varchar('email',{length:255}).notNull(),
  created_at:timestamp('created_at').defaultNow().notNull(),
  updated_at:timestamp('updated_at').defaultNow().notNull()
});