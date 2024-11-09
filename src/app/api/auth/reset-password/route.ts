import { updateUserPassword } from "@/server/actions/user.actions";
import { ChangePasswordFormSchema } from "@/lib/validations";
import { isTokenValid } from "@/server/actions/token.actions";
export async function POST(request: Request) {
  const { token, password, confirmPassword } = await request.json();

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
    const { userId } = await isTokenValid(token);

    if (!userId) {
      return new Response(null, {
        status: 401,
      });
    }
    const { success } = await updateUserPassword(userId, password);
    if (!success) {
      return new Response(
        JSON.stringify({
          message: "oops, something went wrong. Please try again later",
        }),
        { status: 400 },
      );
    }
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "oops, something went wrong. Please try again later",
      }),
      {
        status: 400,
      },
    );
  }
}
