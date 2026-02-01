import { Button, Input } from "@/shared/components";
import { renderFormErrors } from "@/shared/utils";
import { useEmailSettingsForm } from "../hooks";
import { EmailFormContent } from "./FormContent";

export const EmailForm = () => {
  const {
    register,
    errors,
    isValid,
    isDirty,
    isBusy,
    onSubmit,
    resetToCurrentEmail,
  } = useEmailSettingsForm();

  return (
    <form onSubmit={onSubmit} className="space-y-5 mt-10">
      <EmailFormContent />

      <label className="flex flex-col gap-2 text-sm font-medium text-primary-dark/80">
        New email address
        <Input
          enableValidationStyles
          isValid={isValid}
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          {...register("newEmail")}
          aria-invalid={Boolean(errors.newEmail)}
          disabled={isBusy}
        />
        {renderFormErrors(errors.newEmail)}
      </label>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          variant="submit"
          disabled={!isValid || isBusy || !isDirty}
          className="w-fit"
        >
          {isBusy ? "Saving..." : "Save"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={resetToCurrentEmail}
          disabled={isBusy}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
