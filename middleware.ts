// import { NextResponse } from "next/server";
// import {
//   apiPrefix,
//   authRoutes,
//   DEFAULT_LOGIN_REDIRECT,
//   protectedRoutes,
//   publicRoutes,
// } from "./routes";
// import NextAuth from "next-auth";
// import authConfig from "@/auth.config";

import { NextResponse } from "next/server"

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const { nextUrl } = req;
//   const session = req.auth;
//   const isLoggedIn = !!session;
//   const role = session?.user?.role;

//   const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);
//   const isProtectedRoute = nextUrl.pathname.startsWith(protectedRoutes);

//   // Skip middleware for API routes
//   if (isApiRoute) return;

//   // Redirect logged-in users away from auth routes
//   if (isAuthRoute && isLoggedIn) {
//     return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//   }

//   // Redirect guests away from protected routes
//   if (!isLoggedIn && isProtectedRoute) {
//     return NextResponse.redirect(new URL("/login", nextUrl));
//   }

//   // 👇 Role-based access control
//   if (isLoggedIn) {
//     const restrictedPaths = [
//       "/dashboard/documents/upload",
//       "/dashboard/documents/edit",
//       "/dashboard/events/create",
//     ];

//     const isRestricted = restrictedPaths.some((path) =>
//       nextUrl.pathname.startsWith(path)
//     );

//     if (role === "PUBLIC" && isRestricted) {
//       return NextResponse.redirect(new URL("/dashboard", nextUrl));
//     }

//     if (
//       (nextUrl.pathname.startsWith("/api/documents") ||
//         nextUrl.pathname.startsWith("/api/events")) &&
//       (req.method === "POST" || req.method === "PUT" || req.method === "DELETE") &&
//       role === "PUBLIC"
//     ) {
//       return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
//         status: 403,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };

const middleware = () => {
  return (
    NextResponse.next()
  )
}

export default middleware