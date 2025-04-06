// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcryptjs";
// import prisma from "./lib/db";

// const secret = process.env.AUTH_SECRET || process.env.NEXT_AUTH_SECRET;
// if (!secret) {
//   throw new Error("AUTH_SECRET or NEXTAUTH_SECRET is not defined");
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const credentialsWithTypes = credentials as {
//           email: string;
//           password: string;
//         };

//         if (!credentialsWithTypes?.email || !credentialsWithTypes?.password) {
//           throw new Error("Email and password are required");
//         }

//         // Fetch user from the database using Prisma
//         const user = await prisma.user.findUnique({
//           where: { email: credentialsWithTypes.email },
//         });

//         if (!user) {
//           throw new Error("User not found");
//         }

//         console.log("Entered password:", credentialsWithTypes.password);
//         console.log("Stored hashed password:", user.password);

//         // Compare the provided password with the stored hash
//         const isPasswordValid = await compare(
//           credentialsWithTypes.password,
//           user.password
//         );

//         if (!isPasswordValid) {
//           throw new Error("Invalid password");
//         }

//         // Return user data (without the password)
//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           department: user.department,
//           position: user.position,
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//     error: "/login",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//         token.department = user.department;
//         token.position = user.position;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub!;
//         session.user.role = token.role as string;
//         session.user.department = token.department as string | null;
//         session.user.position = token.position as string | null;
//       }
//       return session;
//     },
//   },
//   session: { strategy: "jwt" },
//   secret: secret,
// });

import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  ...authConfig,
});
