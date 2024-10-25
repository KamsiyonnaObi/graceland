import { Resend } from "resend";
import { EmailTemplate } from "@/components/emails/email-template";
import { VerifyEmail } from "@/components/emails/auth/verify-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Graceland <no-reply@gracelandng.com>",
      to: ["obikamsi@gmail.com"],
      subject: "Hello world",
      react: VerifyEmail({ token: "abc123" }),
    });

    if (error) {
      console.log("email not sent");
      return Response.json({ error }, { status: 500 });
    }
    console.log(data, "email sent");
    return Response.json(data);
  } catch (error) {
    console.log("email not sent");
    return Response.json({ error }, { status: 500 });
  }
}
