import type { BaseSyntheticEvent } from "react";
import { Button, Input } from "@/shared/components";
import { renderFormErrors } from "@/shared/utils";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { ChangePasswordSchema } from "../schemas/change-password.schama";
import { PasswordFormContent } from "./PasswordFormContent";

type PasswordFormProps = {
  register: UseFormRegister<ChangePasswordSchema>;
  errors: FieldErrors<ChangePasswordSchema>;
  isValid: boolean;
  isDirty: boolean;
  isBusy: boolean;
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>;
  resetForm: () => void;
};

export const PasswordForm = ({
  register,
  errors,
  isValid,
  isDirty,
  isBusy,
  onSubmit,
  resetForm,
}: PasswordFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5 mt-4">
      <PasswordFormContent />

      <div className="grid gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-primary-dark/80">
          Current password
          <Input
            type="password"
            placeholder="Current password"
            autoComplete="current-password"
            enableValidationStyles
            isValid={!errors.currentPassword}
            {...register("currentPassword")}
            aria-invalid={Boolean(errors.currentPassword)}
            disabled={isBusy}
          />
          {renderFormErrors(errors.currentPassword)}
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-primary-dark/80">
          New password
          <Input
            type="password"
            placeholder="Strong & unique"
            autoComplete="new-password"
            enableValidationStyles
            isValid={!errors.newPassword}
            {...register("newPassword")}
            aria-invalid={Boolean(errors.newPassword)}
            disabled={isBusy}
          />
          {renderFormErrors(errors.newPassword)}
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-primary-dark/80">
          Confirm new password
          <Input
            type="password"
            placeholder="Repeat new password"
            autoComplete="new-password"
            enableValidationStyles
            isValid={!errors.confirmPassword}
            {...register("confirmPassword")}
            aria-invalid={Boolean(errors.confirmPassword)}
            disabled={isBusy}
          />
          {renderFormErrors(errors.confirmPassword)}
        </label>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          variant="submit"
          disabled={!isValid || !isDirty || isBusy}
          className="w-fit"
        >
          {isBusy ? "Saving..." : "Save"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={resetForm}
          disabled={isBusy}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
