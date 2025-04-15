"use client";

import { Database, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ShineBorder } from "../ui/shimer-border";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { SignInFormSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import FormFields from "./FormFields";
import { Button } from "../ui/button";
import { toast } from "sonner";
// import { signin } from "@/actions/signin";

const SignInForm = () => {
  const [isPending, startTransition] = useTransition();
  const formSchema = SignInFormSchema();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // startTransition(() => {
    //   signin(values);
    // })
    router.push("/dashboard");
  };

  return (
    <section className="container mx-auto flex min-h-screen w-screen flex-col items-center justify-center py-10">
      <Link
        href="/"
        className="relative flex justify-center items-center mb-4 lg:mb-0 lg:absolute lg:left-8 lg:top-8 gap-2"
      >
        <Image src="/misde.png" alt="MISDE Logo" width={50} height={50} />
        <Database className="h-6 w-6" />
        <span className="text-lg font-bold">MISDE Database</span>
      </Link>

      <Card className="w-full relative max-w-md">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-2">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>

          <CardTitle className="text-2xl">Login to MISDE Database</CardTitle>
          <CardDescription>
            Access government resources and documents
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <CardContent className="space-y-4">
              <FormFields
                control={form.control}
                name="email"
                label="Email"
                placeholder="name@example.com"
              />
              <FormFields
                control={form.control}
                name="password"
                label="Password"
                placeholder="............"
                type="password"
              />
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                className="w-full cursor-pointer bg-[#A07CFE] hover:bg-[#A07CFE]/90"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Loading..." : "Login"}
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </section>
  );
};

export default SignInForm;
