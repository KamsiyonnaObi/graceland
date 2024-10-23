"use server";
import { Resend } from "resend";

import { VerifyEmail } from "@/components/emails/auth/verify-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailVerification = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Graceland <no-reply@gracelandng.com>",
      to: [email],
      subject: "Activate your Graceland account",
      react: VerifyEmail({ token }),
    });

    if (error) {
      console.log(`Failed to send email to ${email}`, error);
      return { success: false };
    }
    console.log("new user created and confirmation email sent");
    return { success: true };
  } catch (error) {
    console.log("confirmation email not sent: ", error);
    return { success: false };
  }
};
