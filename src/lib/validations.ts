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
  .max(15, "Phone number must be less than 15 digits");
const stateSchema = z
  .string()
  .min(2, "State must be at least 2 characters.")
  .max(20, "State must be less than 20 characters");
const countrySchema = z
  .string()
  .min(2, "Country must be at least 2 characters.")
  .max(20, "Country must be less than 20 characters");

export const signUpFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: nameSchema,
  lastName: nameSchema,
});
export const LogInFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Checkout details schema
export const checkoutDetailsSchema = z
  .object({
    pickUpPerson: z.enum(["customer", "someoneElse"], {
      required_error: "You need to select a pickup person.",
    }),
    pickUpPersonLastName: z.string().optional(),
    pickUpPersonFirstName: z.string().optional(),
    billingFirstName: z
      .string()
      .min(2, {
        message: "First name must be at least 2 characters.",
      })
      .max(20, { message: "First name must be less than 20 characters" }),
    billingLastName: z
      .string()
      .min(2, {
        message: "Last name must be at least 2 characters.",
      })
      .max(20, { message: "Last name must be less than 20 characters" }),
    address: addressSchema,
    email: emailSchema,
    phone: phoneSchema,
    state: stateSchema,
    country: countrySchema,
  })
  .superRefine((data, refinementContext) => {
    if (
      data.pickUpPerson === "someoneElse" &&
      data.pickUpPersonFirstName === ""
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Pickup person first name is required",
        path: ["pickUpPersonFirstName"],
      });
    }
    if (
      data.pickUpPerson === "someoneElse" &&
      data.pickUpPersonLastName === ""
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Pickup person last name is required",
        path: ["pickUpPersonLastName"],
      });
    }
  });
