import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { renderFormErrors } from "@/shared/utils";

import type { SignupSchema } from "../schemas";
import { formFields } from "./form-fileds";

const inputBaseClass =
  "block w-full rounded-2xl border bg-light px-4 py-3 text-base text-dark placeholder:text-muted-foreground/70 shadow-sm transition focus-visible:outline-none focus-visible:ring-4";

interface SignupFormFieldsProps {
  register: UseFormRegister<SignupSchema>;
  errors: FieldErrors<SignupSchema>;
}

export function SignupFormFields({ register, errors }: SignupFormFieldsProps) {
  return (
    <>
      {formFields.map(({ name, label, placeholder, type, autoComplete }) => {
        const fieldError = errors[name];
        const describedBy = fieldError ? `${name}-error` : undefined;
        const inputStateClass = fieldError
          ? "border-danger focus-visible:ring-danger/20"
          : "border-primary/20 focus-visible:ring-primary/20";

        return (
          <div
            key={name}
            className="space-y-2"
            data-testid={`signup-field-${name}`}
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
                data-testid={`signup-input-${name}`}
              />
              {renderFormErrors(fieldError)}
            </div>
          </div>
        );
      })}
    </>
  );
}
