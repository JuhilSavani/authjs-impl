// drizzle models

import { sql } from "drizzle-orm";
import { pgTable as table} from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const providerEnum = t.pgEnum("provider", ["credentials", "google", "github"]);

export const users = table("users", 
  {
    id: t.uuid().primaryKey().defaultRandom(),
    firstName: t.varchar({ length: 255 }).notNull(),
    lastName: t.varchar({ length: 255 }),
    provider: providerEnum().default("credentials"),
    email: t.varchar({ length: 255 }).notNull().unique(),
    isVerified: t.boolean().default(false),
    password: t.varchar(),
    createdAt: t.timestamp().notNull().defaultNow(),
    updatedAt: t.timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
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
