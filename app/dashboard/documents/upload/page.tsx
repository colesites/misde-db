"use server";

import { auth } from "@/auth";
import { DocumentUploadPage } from "@/features/documents";
import { redirect } from "next/navigation";


export default async function UploadDocumentPage() {
  const session = await auth();

  if (session?.user.role === "PUBLIC") redirect("/dashboard");

  return <DocumentUploadPage />;
}
