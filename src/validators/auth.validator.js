import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().trim().min(3, "The name must be 3 characters or more."),
    email: z.string().trim().lowercase().email(),
    password: z.string().min(6, "The password must be 6 characters or more"),
    confirmPassword: z
      .string()
      .min(6, "The password must be 6 characters or more"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords don't match.",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().trim().lowercase().email(),
  password: z.string().min(6, "The password must be 6 characters or more"),
});

const roleSchema = z.object({
  role: z.enum(["reader", "editor", "director"]),
});

export { registerSchema, loginSchema, roleSchema };
