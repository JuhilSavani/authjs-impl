// zod schemas

import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string()
  .nonempty("Email is a required field.")
  .email("Please, enter a valid email address."),
  password: z.string()
  .nonempty("Password is a required field."),
});

export const SignUpSchema = z.object({
  firstName: z.string()
  .nonempty("First name is a required field.")
  .regex(/^[a-zA-Z-' ]+$/, "Please, enter a valid first name."),
  lastName: z.string(),
  email: z.string()
  .nonempty("Email is a required field.")
  .email("Please, enter a valid email address."),
  password: z.string()
  .nonempty("Password is a required field.")
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{8,}$/,
    `Password must contain at least 8 characters, one uppercase letter,
     one lowercase letter, one number, and one special symbol(@$!%*?&) 
     with no spaces.`
  )
});
