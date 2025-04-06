import { Toaster } from "sonner";
import "../globals.css";

export const metadata = {
  title: "MISDE Auth",
  description: "MISDE Auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
