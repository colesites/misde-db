import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export function DotBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[50rem] w-full items-center justify-center bg-gradient-to-b from-white to-gray-200 dark:bg-black ">
      <Image src="/home-banner.jpg" fill alt="Home Banner" className="object-cover opacity-40" quality={100} priority />
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#3b82f6_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      {children}
    </div>
  );
}
