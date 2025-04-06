import * as z from "zod";

export const SignInFormSchema = () => {
  return z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });
};

export const SignUpFormSchema = () => {
  return z
    .object({
      firstName: z
        .string()
        .min(3, { message: "First name must be at least 3 characters" }),
      lastName: z
        .string()
        .min(3, { message: "Last name must be at least 3 characters" }),
      email: z
        .string()
        .email({ message: "Please enter a valid email address" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
      confirmPassword: z
        .string()
        .min(8, { message: "Confirm password must be at least 8 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
};

export const OfficialSignUpFormSchema = () => {
  return z
    .object({
      firstName: z
        .string()
        .min(3, { message: "First name must be at least 3 characters" }),
      lastName: z
        .string()
        .min(3, { message: "Last name must be at least 3 characters" }),
      department: z.string().min(1, { message: "Department is required" }),
      position: z.string().min(1, { message: "Position is required" }),
      email: z
        .string()
        .email({ message: "Please enter a valid email address" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
      confirmPassword: z
        .string()
        .min(8, { message: "Confirm password must be at least 8 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
};

export const ContactSchema = () => {
  return z.object({
    name: z.string(),
    email: z.string().email(),
    message: z.string(),
  })
}

export const DocumentFormSchema = () => {
  return z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters" }),
    content: z.string().optional(),
    type: z.string().min(1, { message: "Document type is required" }),
    department: z.string().min(1, { message: "Department is required" }),
    isPublic: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  });
};

export const EventFormSchema = () => {
  return z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters" }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" }),
    date: z.string().min(1, { message: "Date is required" }),
    location: z
      .string()
      .min(3, { message: "Location must be at least 3 characters" }),
    isVirtual: z.boolean().default(false),
  });
};
