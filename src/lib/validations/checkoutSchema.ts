import { z } from "zod";
import { emailSchema, nameSchema } from "./authSchema";

const errorMessages = {
  addressMin: "Address must be at least 5 characters.",
  addressMax: "Address must be at most 50 characters.",
  phone: "phone number must be exactly 10 digits",
  deliveryNoteMax: "Note must be less than 300 words",
};

export const phoneSchema = z
  .string()
  .min(10, errorMessages.phone)
  .max(10, errorMessages.phone);

export const editPhoneSchema = z.object({
  phoneNumber: phoneSchema,
});

export const checkoutDetailsSchema = z
  .object({
    fulfilmentType: z.enum(["PICKUP", "SHIPPING"], {
      required_error: "You need to select a fufilment option.",
    }),
    pickUpPerson: z.enum(["customer", "someoneElse"]).optional(),
    pickUpPersonLastName: z.string().optional(),
    pickUpPersonFirstName: z.string().optional(),
    billingFirstName: nameSchema,
    billingLastName: nameSchema,
    address: z.string().optional(),
    email: emailSchema,
    phone: phoneSchema,
    state: z.string().optional(),
    country: z.string().optional(),
    deliveryNote: z.string().max(50, errorMessages.deliveryNoteMax).optional(),
  })
  .refine(
    (data) =>
      data.fulfilmentType === "SHIPPING"
        ? data.address && data.state && data.country
        : true,
    {
      message: "Address, state, and country are required for shipping.",
      path: ["address"],
    },
  )
  .refine(
    (data) => {
      if (data.fulfilmentType === "PICKUP") {
        return data.pickUpPerson !== undefined;
      }
      return true;
    },
    {
      message: "You need to select a pickup person for pickup orders.",
      path: ["pickUpPerson"],
    },
  )
  .refine(
    (data) => {
      if (
        data.fulfilmentType === "PICKUP" &&
        data.pickUpPerson === "someoneElse"
      ) {
        return data.pickUpPersonFirstName && data.pickUpPersonLastName;
      }
      return true;
    },
    {
      message:
        "Pickup person first and last name are required when someone else is picking up.",
      path: ["pickUpPersonFirstName"],
    },
  );
