import { KeyRound } from "lucide-react";

import { Button } from "@/shared/components";
import { useForgotPassword } from "@/features/auth/login/hooks/useForgotPassword";

import { usePasswordSettingsForm } from "../hooks";
import { PasswordForm } from "./PasswordForm";

export const PasswordSettings = () => {
  const {
    hasPassword,
    email,
    register,
    errors,
    isValid,
    isDirty,
    isBusy,
    onSubmit,
    resetForm,
  } = usePasswordSettingsForm();
  const { mutate: triggerForgotPassword, isPending: isForgotPending } =
    useForgotPassword();

  if (!hasPassword) {
    return (
      <div className="space-y-4 rounded-3xl border border-primary/10 bg-white/80 p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-secondary p-2 text-primary">
            <KeyRound className="size-6" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-primary/70">
              No password set
            </p>
            <h2 className="text-2xl font-semibold text-primary-dark">
              Add a password for email sign-in
            </h2>
            <p className="text-sm text-muted-foreground">
              You signed in using a provider. Set a password to access your
              account with your email address as well.
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="submit"
          className="w-fit"
          disabled={isForgotPending || !email}
          onClick={() => email && triggerForgotPassword(email)}
        >
          {isForgotPending ? "Sending reset link..." : "Send reset link"}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PasswordForm
        register={register}
        errors={errors}
        isValid={isValid}
        isDirty={isDirty}
        isBusy={isBusy}
        onSubmit={onSubmit}
        resetForm={resetForm}
      />
    </div>
  );
};
