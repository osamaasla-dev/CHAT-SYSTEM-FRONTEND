import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { renderFormErrors } from "@/shared/utils";

import type { LoginSchema } from "../schemas";
import { loginFormFields } from "./form-fields";

const inputBaseClass =
  "block w-full rounded-2xl border bg-light px-4 py-3 text-base text-dark placeholder:text-muted-foreground/70 shadow-sm transition focus-visible:outline-none focus-visible:ring-4";

interface LoginFormFieldsProps {
  register: UseFormRegister<LoginSchema>;
  errors: FieldErrors<LoginSchema>;
}

export function LoginFormFields({ register, errors }: LoginFormFieldsProps) {
  return (
    <>
      {loginFormFields.map(
        ({ name, label, placeholder, type, autoComplete }) => {
          const fieldError = errors[name];
          const describedBy = fieldError ? `${name}-error` : undefined;
          const inputStateClass = fieldError
            ? "border-danger focus-visible:ring-danger/20"
            : "border-primary/20 focus-visible:ring-primary/20";

          return (
            <div
              key={name}
              className="space-y-2"
              data-testid={`login-field-${name}`}
            >
              <label
                className="text-sm font-medium text-primary-dark"
                htmlFor={name}
              >
                {label}
              </label>
              <div className="relative">
                <input
                  id={name}
                  type={type}
                  autoComplete={autoComplete}
                  placeholder={placeholder}
                  {...register(name)}
                  aria-invalid={fieldError ? true : undefined}
                  aria-describedby={describedBy}
                  className={`${inputBaseClass} ${inputStateClass}`}
                  data-testid={`login-input-${name}`}
                />
                {renderFormErrors(fieldError)}
              </div>
            </div>
          );
        },
      )}
    </>
  );
}
