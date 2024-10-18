import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address.");
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.");

const nameSchema = z
  .string()
  .min(2, "name must be at least 2 characters.")
  .max(25, "name must be max 25 characters.");

export const signUpFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: nameSchema,
  lastName: nameSchema,
});

export const logInFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const authFormSchema = (type: string) =>
  z.object({
    firstName: type === "signin" ? z.string().optional() : nameSchema,
    lastName: type === "signin" ? z.string().optional() : nameSchema,
    confirmPassword: type === "signin" ? z.string().optional() : passwordSchema,
    email: emailSchema,
    password: passwordSchema,
  });
