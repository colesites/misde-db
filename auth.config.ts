import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { z } from "zod";
import { SignInFormSchema } from "@/schemas";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./data/user";

const signinFormSchema = SignInFormSchema();

export default {
  providers: [
    Credentials({
      authorize: async (credentials, req) => {
        const validatedFields = await signinFormSchema.safeParseAsync(
          credentials
        );

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
