"use server";

import { SignInFormSchema } from "@/schemas";
import { z } from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

const signinFormSchema = SignInFormSchema();

export const signin = async (values: z.infer<typeof signinFormSchema>) => {
  const validatedFields = signinFormSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid Fields");
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid credentials");
        default:
          throw new Error("Something went wrong!");
      }
    }

    throw error;
  }
};
