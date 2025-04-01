"use server";

import * as z from "zod";
import { authFormSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const signin = async (values: z.infer<typeof authFormSchema>) => {
  const validatedFields = await authFormSchema.spa(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try { 
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password!" };
        default:
          return { error: "Something went wrong! Please try again." };
      }
    }
    throw error;
  }
};
