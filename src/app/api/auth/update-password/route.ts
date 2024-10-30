import { updateUserPassword } from "@/utils/actions/user.actions";
import { emailSchema, ChangePasswordFormSchema } from "@/lib/validations";
export async function POST(request: Request) {
  const { email, password, confirmPassword } = await request.json();

  const isValidEmail = emailSchema.safeParse(email);

  if (!isValidEmail.success) {
    return new Response(
      JSON.stringify({ message: isValidEmail.error.issues[0].message }),
      { status: 401 },
    );
  }
  const validatedFields = ChangePasswordFormSchema.safeParse({
    password,
    confirmPassword,
  });

  if (!validatedFields.success) {
    return new Response(
      JSON.stringify({ message: validatedFields.error.issues[0].message }),
      {
        status: 401,
      },
    );
  }
  try {
    const success = await updateUserPassword(email, password);
    if (!success) {
      return new Response(
        JSON.stringify({ message: "error updating password" }),
        { status: 400 },
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "error updating password" }),
      {
        status: 400,
      },
    );
  }
}
