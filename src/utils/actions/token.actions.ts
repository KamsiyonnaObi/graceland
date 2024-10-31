"use server";
import db from "@/db/db";
import { getUserByEmail } from "./user.actions";
import crypto from "crypto";

export const createToken = async ({
  email,
  expiryTime = 24 * 60 * 60 * 1000,
}: {
  email: string;
  expiryTime?: number;
}) => {
  const expiresAt = new Date(Date.now() + expiryTime);

  try {
    const userId = await getUserByEmail(email);
    if (!userId?.id) {
      return { success: false, message: "User not found for token generation" };
    }
    const userToken = crypto.randomBytes(32).toString("base64url");
    const newToken = await db.token.create({
      data: {
        id: userToken,
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

export const isTokenValid = async (tokenId: string) => {
  try {
    const token = await db.token.findUnique({ where: { id: tokenId } });

    if (!token) return { userId: null };

    const isValid = token.expiresAt >= new Date();

    if (!isValid) return { userId: null };

    return { userId: token.userId };
  } catch (error) {
    console.error("Error checking token validity:", error);
    return { userId: null };
  }
};
