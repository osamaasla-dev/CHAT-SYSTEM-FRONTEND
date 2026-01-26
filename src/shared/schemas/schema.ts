import { z } from "zod";

export const tokenSchema = z.string().min(1).regex(/^\S+$/);
export const nameSchema = z
  .string({
    message: "Name must be a string",
  })
  .min(4, { message: "Name must be at least 4 characters long" })
  .regex(/^[\p{L}\s'-]+$/u, {
    message: "Name contains invalid characters",
  });

export const emailSchema = z
  .string({
    message: "Email must be a valid email",
  })
  .email({ message: "Email must be a valid email" });

export const passwordSchema = z
  .string()
  .min(8)
  .regex(/^\S+$/, "Password must not contain spaces")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(/[^A-Za-z0-9]/, "Must contain a special character");
