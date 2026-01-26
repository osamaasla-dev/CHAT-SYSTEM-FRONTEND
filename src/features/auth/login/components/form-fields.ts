import type { LoginSchema } from "../schemas";

type LoginField = {
  name: keyof LoginSchema;
  label: string;
  placeholder: string;
  type: "email" | "password";
  autoComplete: string;
};

export const loginFormFields: LoginField[] = [
  {
    name: "email",
    label: "Email address",
    placeholder: "mariam@acme.io",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    autoComplete: "current-password",
  },
];
