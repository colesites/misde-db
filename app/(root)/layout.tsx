import type React from "react";
import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MISDE Database - Government Digital Ecosystem",
  description:
    "Modern Integrated State Digital Ecosystem for government research and documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
      <Toaster />
    </>
  );
}
