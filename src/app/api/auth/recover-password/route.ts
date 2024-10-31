import { sendEmailToUser } from "@/utils/actions/notifications.actions";
import { RecoverPassword } from "@/components/emails/auth/recover-password";
import { createToken } from "@/utils/actions/token.actions";
import { emailSchema } from "@/lib/validations";

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

export async function POST(request: Request) {
  const { email } = await request.json();

  const isValidEmail = emailSchema.safeParse(email);

  if (!isValidEmail.success) {
    return new Response(
      JSON.stringify({ message: "Please provide a valid email." }),
      { status: 401 },
    );
  }

  try {
    const token = await createToken({ email, expiryTime: ONE_HOUR_IN_MS });
    if (!token.success) {
      return new Response(null, { status: 204 });
    }
    await sendEmailToUser({
      email,
      subject: "Please reset your password",
      emailComponent: RecoverPassword({ token: token.message }),
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(
      `Error sending password recovery for email ${email} - ${error}`,
    );
    return new Response(JSON.stringify({ message: "Something went wrong." }), {
      status: 500,
    });
  }
}
