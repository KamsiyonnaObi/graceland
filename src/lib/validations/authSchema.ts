import { z } from "zod";

const errorMessages = {
  email: "Invalid email address.",
  nameMin: "Name must be at least 2 characters.",
  nameMax: "Name must be at most 25 characters.",
  passwordMin: "Password must be at least 8 characters.",
  passwordMismatch: "Passwords must match.",
};

export const emailSchema = z.string().email(errorMessages.email);
const passwordSchema = z.string().min(8, errorMessages.passwordMin);

export const nameSchema = z
  .string()
  .min(2, errorMessages.nameMin)
  .max(25, errorMessages.nameMax);

export const editNameSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
});

export const editEmailSchema = z.object({
  email: emailSchema,
});

export const authFormSchema = (type: string) =>
  z
    .object({
      firstName: type === "signin" ? z.string().optional() : nameSchema,
      lastName: type === "signin" ? z.string().optional() : nameSchema,
      confirmPassword:
        type === "signin" ? z.string().optional() : passwordSchema,
      email: emailSchema,
      password: passwordSchema,
    })
    .superRefine((data, ctx) => {
      if (type === "signup" && data.confirmPassword !== data.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessages.passwordMismatch,
          path: ["confirmPassword"],
        });
      }
    });

export const ChangePasswordFormSchema = z
  .object({
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .superRefine((data, ctx) => {
    if (data.confirmNewPassword !== data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorMessages.passwordMismatch,
        path: ["confirmPassword"],
      });
    }
  });
