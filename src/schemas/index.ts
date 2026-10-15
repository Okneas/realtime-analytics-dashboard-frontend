import z from "zod";

export const LoginDataSchema = z.object({
  email: z.email("Invalid email").trim(),
  password: z.string().min(8, "Password too short"),
});

export const RegisterDataSchema = z
  .object({
    full_name: z.string().min(2, "Please, enter your full name"),
    email: z.string().trim().pipe(z.email("Invalid email")),
    password: z.string().min(8, "Password too short"),
    confirmPassword: z.string().min(8, "Password too short"),
    acceptTerms: z.literal(true, { message: "You must accept the terms" }),

    workspace_name: z.string().min(2, "Workspace name is too short"),
    workspace_slug: z
      .string()
      .min(3, "Slug is too short")
      .max(30, "Slug is too long")
      .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers and hyphens"),
    invite_emails: z.array(z.email("Invalid email")).optional(),

    role: z.enum(["analyst", "viewer", "admin"], "Invalid option"),
    job_title: z.string().min(2, "Job title is too short").optional(),
    company_name: z.string().min(2, "Company name is too short").optional(),
    industry: z.enum([
      "fintech",
      "saas",
      "ecommerce",
      "crypto",
      "healthcare",
      "other",
    ], "Invalid option"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ForgotDataSchema = z.object({
  code: z.string().nonempty("Please, enter your username").min(2),
});
