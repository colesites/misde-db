"use client";

import type React from "react";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function DashboardSearch() {
  const [input, setInput] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
      <PlaceholdersAndVanishInput
        placeholders={[
          "Search for documents, research papers, policies...",
        ]}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={handleSearch}
        className="relative !m-0 !max-w-full"
      />
  );
}
