"use client";
import React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Sparkles } from "lucide-react";

export function GradientButton() {
  return (
    <HoverBorderGradient
      containerClassName="rounded-full"
      as="button"
      className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full">
        <Sparkles className="h-4 w-4" />
        <span className="text-sm font-medium">
          Government Digital Transformation Initiative
        </span>
      </div>
    </HoverBorderGradient>
  );
}
