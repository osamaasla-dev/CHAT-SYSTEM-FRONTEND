import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { renderFormErrors } from "@/shared/utils";
import type { ResetPasswordFormSchema } from "../schemas";

interface ResetPasswordFormFieldsProps {
  register: UseFormRegister<ResetPasswordFormSchema>;
  errors: FieldErrors<ResetPasswordFormSchema>;
}

export function ResetPasswordFormFields({
  register,
  errors,
}: ResetPasswordFormFieldsProps) {
  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="password"
          className="text-sm font-semibold text-primary-dark"
        >
          New password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register("password")}
          className="mt-3 w-full rounded-2xl border border-secondary bg-secondary/50 px-5 py-4 text-base font-medium text-dark placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
          placeholder="Enter a strong password"
        />
        {renderFormErrors(errors.password)}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="text-sm font-semibold text-primary-dark"
        >
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword")}
          className="mt-3 w-full rounded-2xl border border-secondary bg-secondary/50 px-5 py-4 text-base font-medium text-dark placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
          placeholder="Re-enter your password"
        />
        {renderFormErrors(errors.confirmPassword)}
      </div>
    </div>
  );
}
