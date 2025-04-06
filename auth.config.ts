import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { z } from "zod";
import { SignInFormSchema } from "@/schemas";

const signinFormSchema = SignInFormSchema();

export default {
  providers: [
    Credentials({
      authorize: async (credentials, req) => {
        const validatedFields = await signinFormSchema.safeParseAsync(credentials);

        if (!validatedFields.success) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = validatedFields.data;

        // TODO: Authenticate user here (e.g., check against DB)
        // For example:
        const user = { id: "1", name: "Test User", email };

        return user; // Return `null` if authentication fails
      },
    }),
  ],
} satisfies NextAuthConfig;
