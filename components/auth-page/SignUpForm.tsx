"use client";

import { Database, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition, useState } from "react";
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
import { SignUpFormSchema, OfficialSignUpFormSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import FormFields from "./FormFields";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner";
import SelectFormField from "./SelectFormField";
import bcrypt from "bcryptjs";
import { registerOfficial, registerUser } from "@/actions/register";

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [userType, setUserType] = useState("public");

  const router = useRouter();

  // Create two separate form instances
  const publicFormSchema = SignUpFormSchema();
  const officialFormSchema = OfficialSignUpFormSchema();

  // Form for public users
  const formPublic = useForm<z.infer<typeof publicFormSchema>>({
    resolver: zodResolver(publicFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Form for official users
  const formOfficial = useForm<z.infer<typeof officialFormSchema>>({
    resolver: zodResolver(officialFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      department: "",
      position: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Define department options
  const departmentOptions = [
    { value: "administration", label: "Administration" },
    { value: "finance", label: "Finance" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "agriculture", label: "Agriculture" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "technology", label: "Technology" },
  ];

  // Submit handler for public users
  const onSubmitPublic = async (values: z.infer<typeof publicFormSchema>) => {
    // startTransition(() => {
    //   registerUser(values);
    // });
    router.push("/dashboard");
  };

  // Submit handler for official users
  const onSubmitOfficial = async (
    values: z.infer<typeof officialFormSchema>
  ) => {
    startTransition(() => {
      registerOfficial(values);
    });
  };

  // Handle user type change
  const handleUserTypeChange = (value: string) => {
    setUserType(value);
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

        <Tabs defaultValue="public" onValueChange={handleUserTypeChange}>
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="public">Public User</TabsTrigger>
              <TabsTrigger value="official">Government Official</TabsTrigger>
            </TabsList>
          </div>

          {/* Public User Form */}
          <TabsContent value="public">
            <Form {...formPublic}>
              <form
                onSubmit={formPublic.handleSubmit(onSubmitPublic)}
                className="space-y-10"
              >
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormFields
                      control={formPublic.control}
                      name="firstName"
                      label="First name"
                      placeholder="John"
                    />

                    <FormFields
                      control={formPublic.control}
                      name="lastName"
                      label="Last name"
                      placeholder="Doe"
                    />
                  </div>

                  <FormFields
                    control={formPublic.control}
                    name="email"
                    label="Email"
                    placeholder="name@example.com"
                  />

                  <div className="rounded-md bg-muted p-3 text-sm">
                    <p>
                      As a public user, you'll have access to read public
                      documents and research papers, but won't be able to
                      create, edit, or delete documents.
                    </p>
                  </div>

                  <FormFields
                    control={formPublic.control}
                    name="password"
                    label="Password"
                    placeholder="............"
                    type="password"
                  />

                  <FormFields
                    control={formPublic.control}
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
                    disabled={isPending}
                  >
                    {isPending ? "Loading..." : "Create Account"}
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
          </TabsContent>

          {/* Official User Form */}
          <TabsContent value="official">
            <Form {...formOfficial}>
              <form
                onSubmit={formOfficial.handleSubmit(onSubmitOfficial)}
                className="space-y-10"
              >
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormFields
                      control={formOfficial.control}
                      name="firstName"
                      label="First name"
                      placeholder="John"
                    />

                    <FormFields
                      control={formOfficial.control}
                      name="lastName"
                      label="Last name"
                      placeholder="Doe"
                    />
                  </div>

                  <FormFields
                    control={formOfficial.control}
                    name="email"
                    label="Email"
                    placeholder="name@department.gov.ng"
                  />

                  <SelectFormField
                    control={formOfficial.control}
                    name="department"
                    label="Department"
                    placeholder="Select your department"
                    options={departmentOptions}
                    required={true}
                  />

                  <FormFields
                    control={formOfficial.control}
                    name="position"
                    label="Position"
                    placeholder="Your official position"
                  />

                  <FormFields
                    control={formOfficial.control}
                    name="password"
                    label="Password"
                    placeholder="............"
                    type="password"
                  />

                  <FormFields
                    control={formOfficial.control}
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
                    disabled={isPending}
                  >
                    {isPending ? "Loading..." : "Submit Request"}
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
          </TabsContent>
        </Tabs>
      </Card>
    </section>
  );
};

export default SignUpForm;
