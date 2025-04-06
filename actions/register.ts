"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "../lib/db";
import {
  OfficialSignUpFormSchema,
  SignInFormSchema,
  SignUpFormSchema,
} from "@/schemas";

const signupFormSchema = SignUpFormSchema();
const officialFormSchema = OfficialSignUpFormSchema();

export const registerUser = async (
  values: z.infer<typeof signupFormSchema>
) => {
  const validatedFields = await signupFormSchema.safeParseAsync(values);

  if (!validatedFields.success) {
    throw new Error("Invalid Fields");
  }

  const { firstName, lastName, email, password, confirmPassword } =
    validatedFields.data;

  const name = firstName + lastName;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  await prisma.user.create({
    data: {
      name: name,
      email,
      password: hashedPassword,
    },
  });
};

export const registerOfficial = async (
  values: z.infer<typeof officialFormSchema>
) => {
  const validatedFields = await officialFormSchema.safeParseAsync(values);

  if (!validatedFields.success) {
    throw new Error("Invalid Fields");
  }

  const { firstName, lastName, email, password, confirmPassword, department, position } =
    validatedFields.data;

  const name = firstName + " " + lastName;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(password, 14);

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const existingName = await prisma.user.findUnique({
    where: {
      name,
    },
  });

  if (existingUser || existingName) {
    throw new Error("Email or name already in use");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      department,
      position,
    },
  });
};
