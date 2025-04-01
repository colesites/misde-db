"use client";

import { motion } from "framer-motion";
import { ArrowRight, Database, Search, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GradientButton } from "./GradientButton";

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10" />

      <div className="container flex flex-col items-center py-16 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <GradientButton />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Modern Integrated State <br className="hidden md:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Digital Ecosystem
          </span>
        </motion.h1>

        <motion.p
          className="max-w-3xl text-muted-foreground mb-10 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          A cutting-edge platform transforming government data into accessible
          digital knowledge, powering research, innovation, and informed
          policy-making.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-16 w-full max-w-md mx-auto justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/register">
              Create Account <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="font-medium mb-2">Digital Archive</h3>
            <p className="text-sm text-muted-foreground text-center">
              Digitized government documents and research papers
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="font-medium mb-2">AI-Powered Search</h3>
            <p className="text-sm text-muted-foreground text-center">
              Find exactly what you need with semantic search
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-medium mb-2">Smart Analytics</h3>
            <p className="text-sm text-muted-foreground text-center">
              AI-driven insights from government data
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-medium mb-2">Public Access</h3>
            <p className="text-sm text-muted-foreground text-center">
              Citizens can access and read public documents
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
