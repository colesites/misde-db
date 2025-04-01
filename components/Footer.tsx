"use client";

import { Database } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/misde.png" alt="MISDE Logo" width={50} height={50} />
              <Database className="h-6 w-6" />
              <span className="text-lg font-bold">MISDE Database</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering government with digital solutions for better document
              management and information access.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-sm hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#events" className="text-sm hover:text-primary">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm hover:text-primary">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  APIs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Training Materials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div id="contact">
            <h3 className="font-semibold mb-4">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>Government House</p>
              <p>Ekiti State, Nigeria</p>
              <p>Email: contact@misde.gov.ng</p>
              <p>Phone: +234 (0) 123 456 7890</p>
            </address>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} MISDE Database. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
