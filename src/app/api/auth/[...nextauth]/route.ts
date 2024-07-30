/* eslint-disable camelcase */
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import db from "@/db/db";
import { isValidPassword } from "@/lib/isValidPassword";

interface User {
  id: string;
  name: string;
  email: string;
  local: boolean;
}

interface Profile {
  email: string;
  fullName: string;
  username: string;
  [key: string]: any;
}

const authOptions = {
  providers: [
    CredentialsProvider({
      // id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(
        credentials: Record<"email" | "password", string>,
      ): Promise<User | null | undefined> {
        try {
          const user = await db.user.findUnique({
            where: { email: credentials.email },
          });
          if (
            user &&
            (await isValidPassword(credentials.password, user.password!))
          ) {
            return {
              id: user.id,
              email: user.email,
              name: user.firstName,
              local: true,
            };
          }
        } catch (error) {
          console.log("Authentication error ", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  debug: false,

  // adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
    encryption: true,
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },

  callbacks: {
    async signIn(profile: Profile) {
      if (profile?.user.local) {
        return true;
      }
      const { email } = profile.user;
      const { given_name, family_name } = profile.profile;

      try {
        let user = await db.user.findUnique({ where: { email } });

        if (!user) {
          user = await db.user.create({
            data: {
              firstName: given_name,
              lastName: family_name,
              email: email,
            },
          });
        }
      } catch (error) {
        console.error("Sign-in error:", error);
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
