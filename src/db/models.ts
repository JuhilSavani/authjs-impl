// drizzle models

import { sql } from "drizzle-orm";
import { pgTable as table} from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const providerEnum = t.pgEnum("provider", ["credentials", "google", "github"]);

export const users = table("users", 
  {
    id: t.uuid("id").primaryKey().defaultRandom(),
    firstName: t.text("first_name").notNull(),
    lastName: t.text("last_name"),
    provider: providerEnum("provider").notNull().default("credentials"),
    email: t.text("email").notNull().unique(),
    emailVerified: t.timestamp("email_verified"),
    password: t.text("password"),
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
