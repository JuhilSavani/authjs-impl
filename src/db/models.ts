// drizzle models

import { sql } from "drizzle-orm";
import { pgTable as table} from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const providerEnum = t.pgEnum("provider", ["credentials", "google", "github"]);

export const users = table("users", 
  {
    id: t.uuid().primaryKey().defaultRandom(),
    firstName: t.varchar("first_name", { length: 255 }).notNull(),
    lastName: t.varchar("last_name", { length: 255 }),
    provider: providerEnum().notNull().default("credentials"),
    email: t.varchar({ length: 255 }).notNull().unique(),
    isVerified: t.boolean("is_verified").notNull().default(false),
    password: t.varchar(),
    createdAt: t.timestamp("created_at").notNull().defaultNow(),
    updatedAt: t.timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [{
    emailIdx: t.index().on(table.email),
    checkConstraint: t.check(
      "password_provider_check", // !(password == null && provider == 'credentials')
      sql`${table.password} IS NOT NULL OR ${table.provider} != 'credentials'`
    )
  }]
);

// TODO: create a table for verification tokens for email verification, password reset and 2FA check
