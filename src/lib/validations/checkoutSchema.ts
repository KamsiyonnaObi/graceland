import { z } from "zod";
import { emailSchema, nameSchema } from "./authSchema";

const errorMessages = {
  addressMin: "Address must be at least 5 characters.",
  addressMax: "Address must be at most 50 characters.",
  phone: "phone number must be exactly 10 digits",
  deliveryNoteMax: "Note must be less than 300 words",
};

const stateSchema = z.string();
const countrySchema = z.string();
const addressSchema = z
  .string()
  .min(5, errorMessages.addressMin)
  .max(50, errorMessages.addressMax);

export const phoneSchema = z
  .string()
  .min(10, errorMessages.phone)
  .max(10, errorMessages.phone);

export const editPhoneSchema = z.object({
  phoneNumber: phoneSchema,
});

export const checkoutDetailsSchema = z
  .object({
    pickUpPerson: z.enum(["customer", "someoneElse"], {
      required_error: "You need to select a pickup person.",
    }),
    pickUpPersonLastName: z.string().optional(),
    pickUpPersonFirstName: z.string().optional(),
    billingFirstName: nameSchema,
    billingLastName: nameSchema,
    address: addressSchema,
    email: emailSchema,
    phone: phoneSchema,
    state: stateSchema,
    country: countrySchema,
    deliveryNote: z.string().max(50, errorMessages.deliveryNoteMax).optional(),
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
