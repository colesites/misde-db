"use client";

import { Database, Lock, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ShineBorder } from "../ui/shimer-border";
import { Form, FormLabel } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SignUpFormSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import FormFields from "./FormFields";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("public");
  const [formData, setFormData] = useState({
    department: "",
  });

  const router = useRouter();
  const formSchema = SignUpFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      position: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    router.push("/dashboard");
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
          </div>

          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Sign up to access government resources
          </CardDescription>
        </CardHeader>

        <Tabs defaultValue="public" onValueChange={setUserType}>
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="public">Public User</TabsTrigger>
              <TabsTrigger value="official">Government Official</TabsTrigger>
            </TabsList>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormFields
                    control={form.control}
                    name="firstName"
                    label="First name"
                    placeholder="John"
                  />

                  <FormFields
                    control={form.control}
                    name="lastName"
                    label="Last name"
                    placeholder="Doe"
                  />
                </div>

                <FormFields
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder={
                    userType === "official"
                      ? "name@department.gov.ng"
                      : "name@example.com"
                  }
                />

                <TabsContent value="official" className="space-y-4 mt-0 p-0">
                  <div className="space-y-2">
                    <FormLabel>Department</FormLabel>
                    <Select
                      value={formData.department}
                      onValueChange={(value) =>
                        handleSelectChange("department", value)
                      }
                      required={userType === "official"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administration">
                          Administration
                        </SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                        <SelectItem value="infrastructure">
                          Infrastructure
                        </SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <FormFields
                    control={form.control}
                    name="position"
                    label="Position"
                    placeholder="Your official position"
                  />
                </TabsContent>

                <TabsContent value="public" className="mt-0 p-0">
                  <div className="rounded-md bg-muted p-3 text-sm">
                    <p>
                      As a public user, you'll have access to read public
                      documents and research papers, but won't be able to
                      create, edit, or delete documents.
                    </p>
                  </div>
                </TabsContent>

                <FormFields
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="............"
                  type="password"
                />

                <FormFields
                  control={form.control}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="............"
                  type="password"
                />
              </CardContent>

              <CardFooter className="flex flex-col">
                <Button
                  className="w-full cursor-pointer bg-[#A07CFE] hover:bg-[#A07CFE]/90"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Loading..."
                    : userType === "official"
                    ? "Submit Request"
                    : "Create Account"}
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Form>
        </Tabs>
      </Card>
    </section>
  );
};

export default SignUpForm;
