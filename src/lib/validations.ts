import { z } from "zod";

const nameSchema = z
  .string()
  .min(2, "name must be at least 2 characters.")
  .max(25, "name must be max 25 characters.");
const emailSchema = z.string().email("Invalid email address.");
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.");
const addressSchema = z
  .string()
  .min(5, "Address must be at least 5 characters.")
  .max(50, "Address must be less than 50 characters");
const phoneSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits.")
  .max(10, "Phone number must be 10 digits");
const stateSchema = z
  .string()
  .min(2, "State must be at least 2 characters.")
  .max(20, "State must be less than 20 characters");
const countrySchema = z
  .string()
  .min(2, "Country must be at least 2 characters.")
  .max(20, "Country must be less than 20 characters");
