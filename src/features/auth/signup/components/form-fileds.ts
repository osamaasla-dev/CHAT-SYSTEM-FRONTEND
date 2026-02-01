import type { SignupSchema } from "../schemas";

interface FieldConfig {
  name: keyof SignupSchema;
  label: string;
  placeholder: string;
  type: "text" | "email" | "password";
  autoComplete: string;
}

export const formFields: FieldConfig[] = [
  {
    name: "name",
    label: "Full name",
    placeholder: "Aisha Al-Hassan",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Work email",
    placeholder: "aisha@example.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Minimum 6 characters",
    type: "password",
    autoComplete: "new-password",
  },
];
