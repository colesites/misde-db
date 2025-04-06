// "use server";

// import * as z from "zod";
// import { SignInFormSchema } from "@/schemas";
// import { signIn } from "@/auth";
// import { AuthError } from "next-auth";

// const formSchema = SignInFormSchema();

// export const signin = async (values: z.infer<typeof formSchema>) => {
//   const validatedFields = await formSchema.safeParseAsync(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   const { email, password } = validatedFields.data;

//   try {
//     await signIn("credentials", {
//       email,
//       password,
//       redirectTo: "/dashboard",
//     });
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return { error: "Invalid email or password!" };
//         default:
//           return { error: "Something went wrong! Please try again." };
//       }
//     }
//     throw error;
//   }
// };
"use server";

import { SignInFormSchema } from "@/schemas";
import { z } from "zod";

const formSchema = SignInFormSchema();

export const signin = async (values: z.infer<typeof formSchema>) => {
  const validatedFields = await formSchema.spa(values);

  if (!validatedFields) {
    throw new Error("Invalid Fields")
  }

  
  // toast("Login Successful")

  try {
    // Successful login will redirect via the server action
  } catch (error) {
  } finally {
  }
};
