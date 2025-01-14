CREATE TYPE "public"."provider" AS ENUM('credentials', 'google', 'github');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255),
	"provider" "provider" DEFAULT 'credentials',
	"email" varchar(255) NOT NULL,
	"is_verified" boolean DEFAULT false,
	"password" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
