"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Database, Menu } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/misde.png" alt="MISDE Logo" width={50} height={50} quality={100} priority />
          <Database className="h-6 w-6" />
          <span className="text-lg md:text-xl font-bold">MISDE Database</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">Home</Link>
          <Link href="#features" className="text-sm font-medium hover:text-primary">Features</Link>
          <Link href="#events" className="text-sm font-medium hover:text-primary">Events</Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary">Contact</Link>
        </nav>
        <div className="hidden md:block">
          <Button asChild variant="outline" className="mr-2">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-red-500 to-yellow-500">
            <Link href="/register">Register</Link>
          </Button>
        </div>
        <div className="block md:hidden">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger>
              <Menu className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-10 flex flex-col items-center space-y-2 p-4">
              {[
                { href: "/", label: "Home" },
                { href: "#features", label: "Features" },
                { href: "#events", label: "Events" },
                { href: "#contact", label: "Contact" },
              ].map(({ href, label }) => (
                <DropdownMenuItem key={href} onClick={handleClose} className="w-full text-center">
                  <Link href={href} className="text-sm font-medium hover:text-primary block w-full">
                    {label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <div className="w-full flex flex-col items-center space-y-2 mt-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="w-full bg-gradient-to-r from-red-500 to-yellow-500">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
