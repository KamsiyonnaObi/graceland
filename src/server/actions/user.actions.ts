"use server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";

import db from "@/server/db/db";
import { hashPassword, isValidPassword } from "@/lib/isValidPassword";

import { SignUp } from "@/app/(auth)/signup/page";
import { isTokenValid } from "./token.actions";
import { UserParams } from "@/types";
import {
  ChangePasswordFormSchema,
  editNameSchema,
  editPhoneSchema,
  updateEmailSchema,
} from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getCurrentUser() {
  const currentUser: any = await getServerSession();
  if (!currentUser) {
    return null;
  }

  const { email } = currentUser.user;

  const loggedInUserId = await getUserByEmail(email);

  return loggedInUserId;
}

export async function getUserByEmail(email: string) {
  try {
    const loggedInUserId = await db.user.findUnique({
      where: { email },
      select: { id: true, email: true },
    });

    if (!loggedInUserId) {
      return null;
    }

    return loggedInUserId;
  } catch (error) {
    console.error(`error finding user - ${email} -> ${error}`);
    return null;
  }
}

export async function getCurrentUserPersonalDetails() {
  try {
    const currentUser: any = await getServerSession();
    if (!currentUser) {
      return null;
    }

    const { email } = currentUser.user;

    const loggedInUserId = await db.user.findUnique({
      where: { email },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      },
    });

    if (!loggedInUserId) {
      return null;
    }

    return loggedInUserId;
  } catch (error) {
    console.error(`error finding user -> ${error}`);
    return null;
  }
}

export async function getAllUsers() {
  try {
    const users = await db.user.findMany();

    if (!users) {
      return { message: "no user found" };
    }

    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function newUser(signUpInfo: SignUp) {
  try {
    // check if user exists
    const existingUser: any = await db.user.findUnique({
      where: { email: signUpInfo.email },
    });
    if (existingUser) {
      return { status: 500, message: "unable to sign user up" };
    }
    // hash password
    const hashedPassword = await hashPassword(signUpInfo.password);

    // Create a new user with hashed password
    const newUser = await db.user.create({
      data: {
        firstName: signUpInfo.firstName,
        lastName: signUpInfo.lastName,
        email: signUpInfo.email,
        password: hashedPassword, // Store hashed password
      },
    });
    // sign token and return the created user
    jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET || "",
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      },
      (err, token) => {
        if (err) {
          return { status: 500, message: "unable to sign user up" };
        }
        if (token) {
          // store token in cookies
          cookies().set("token", token);
        }
      },
    );
    return { message: "Successfully logged in", status: 200 };
  } catch (error) {
    console.log(error);
  }
}

export async function signUserOut() {
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set("token", "", { expires: Date.now() - oneDay });
}

export async function updateUser(userId: string, params: Partial<UserParams>) {
  try {
    await db.user.update({
      where: { id: userId },
      data: params,
    });
    revalidatePath("/account");
    return { success: true };
  } catch (error) {
    console.error("User update failed:", error);
    return { success: false, error: "oops, Something went wrong" };
  }
}

export async function updateUserPassword(userId: string, password: string) {
  try {
    const hashedPassword = await hashPassword(password);
    await db.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return { success: true };
  } catch (error) {
    console.error("Password update failed:", error);
    return { success: false, error: "Password update failed" };
  }
}

export async function updateUserPersonalDetails(
  params: Partial<UserParams>,
  type: string,
): Promise<{ success: boolean; error?: string; status?: number }> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { success: false, error: "User not found" };
    }

    const { id, email } = currentUser;
    switch (type) {
      case "editName":
        return await validateAndUpdateUser(id, params, editNameSchema);

      case "editPhone":
        return await validateAndUpdateUser(id, params, editPhoneSchema);

      case "editEmail":
        return await handleEditEmail(id, email, params);

      case "editPassword":
        return await handleEditPassword(id, email, params);

      default:
        return { success: false, error: "Invalid form type" };
    }
  } catch (error) {
    console.error("Error updating user details:", error);
    return { success: false, error: "An error occurred during update" };
  }
}

export async function verifyUserEmail(token: string) {
  try {
    const { userId } = await isTokenValid(token);

    if (!userId) {
      return { success: false, message: "user token invalid or expired" };
    }

    await db.user.update({
      where: { id: userId },
      data: { verifiedEmail: true },
    });

    return { success: true, message: "user email has been verified" };
  } catch (error) {
    console.error(`failed to verify email - ${error}`);
    return {
      success: false,
      message: "something went wrong, please try again later",
    };
  }
}

export async function compareUserPassword(email: string, password: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
      select: { password: true },
    });
    if (!user) {
      return { success: false, error: "User not found" };
    }
    const validPassword = await isValidPassword(password, user.password || "");
    if (!validPassword) {
      return {
        success: false,
        status: 401,
        error:
          "This password doesn't match your account password. Please try again.",
      };
    }
    return { success: true };
  } catch (error) {
    console.error("Error comparing user password", error);
    return {
      success: false,
      status: 500,
      error: "error comparing user password",
    };
  }
}

export async function getUserLatestOrders() {
  const currentUserId = await getCurrentUser();

  if (!currentUserId?.id) {
    return { status: 401, message: "Unauthorized" };
  }
  const userOrders = await db.user.findUnique({
    where: { id: currentUserId.id },
    select: {
      firstName: true,
      orders: {
        where: { paymentStatus: "SUCCESS" },
        orderBy: { createdAt: "desc" },
        select: {
          createdAt: true,
          updatedAt: true,
          totalPriceInCents: true,
          trxref: true,
          orderItems: {
            select: {
              product: { select: { name: true, imagePath: true } },
              quantity: true,
            },
          },
        },
      },
    },
  });

  return { status: 200, message: "success", userOrders };
}

export async function deleteUser(id: string) {
  const user = await db.user.delete({
    where: { id },
  });

  if (user == null) return notFound();

  return user;
}

// helper functions
async function validateAndUpdateUser(
  userId: string,
  params: Partial<UserParams>,
  schema: z.AnyZodObject | z.ZodSchema,
) {
  const isValid = schema.safeParse(params);
  if (!isValid.success)
    return { success: false, error: isValid.error.issues[0].message };

  return await updateUser(userId, params);
}

async function handleEditPassword(
  userId: string,
  email: string,
  params: Partial<UserParams>,
) {
  const isPasswordValid = await compareUserPassword(email, params.password!);
  if (!isPasswordValid.success) return isPasswordValid;

  const passwordValidation = ChangePasswordFormSchema.safeParse(params);
  if (!passwordValidation.success)
    return { success: false, error: "Password validation failed" };

  return await updateUserPassword(userId, params.newPassword!);
}

async function handleEditEmail(
  userId: string,
  email: string,
  params: Partial<UserParams>,
) {
  const isPasswordValid = await compareUserPassword(email, params.password!);

  if (!isPasswordValid.success) return isPasswordValid;
  return await validateAndUpdateUser(
    userId,
    { email: params.email, verifiedEmail: false },
    updateEmailSchema,
  );
}
