"use server";
import db from "@/db/db";
import { getCurrentUser } from "./user.actions";

export const createToken = async () => {
  const oneDay = 24 * 60 * 60 * 1000;
  const expiresAt = new Date(Date.now() + oneDay);

  try {
    const userId = await getCurrentUser();
    if (!userId?.id) {
      return { success: false, message: "User not found for token generation" };
    }
    const newToken = await db.token.create({
      data: {
        expiresAt,
        user: { connect: { id: userId.id } },
      },
    });
    if (!newToken) {
      return {
        success: false,
        message: `Failed to create token for user with ID: ${userId}`,
      };
    }
    return { success: true, message: newToken.id };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
};
