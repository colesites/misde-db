import { NextResponse } from "next/server";
import {
  apiPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  protectedRoutes,
  publicRoutes,
} from "./routes";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = nextUrl.pathname.startsWith(protectedRoutes);

  if (isApiRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn) {
    if (auth?.user?.role === "PUBLIC") {
      if (
        nextUrl.pathname.startsWith("/dashboard/documents/upload") ||
        nextUrl.pathname.startsWith("/dashboard/documents/edit") ||
        nextUrl.pathname.startsWith("/dashboard/events/create")
      ) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }

      return;
    }

    if (auth?.user?.role === "ADMIN") {
      if (
        nextUrl.pathname.startsWith("/dashboard/documents/upload") ||
        nextUrl.pathname.startsWith("/dashboard/documents/edit") ||
        nextUrl.pathname.startsWith("/dashboard/events/create")
      ) {
        return;
      }
    }

    if (
      (nextUrl.pathname.startsWith("/api/documents") ||
        nextUrl.pathname.startsWith("/api/events")) &&
      (req.method === "POST" || req.method === "PUT" || req.method === "DELETE")
    ) {
      return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  return;
});

export const config = {
  runtime: "nodejs",
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
