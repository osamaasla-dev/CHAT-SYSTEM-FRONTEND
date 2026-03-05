import { Pencil, UserRound } from "lucide-react";

import { Button, Input } from "@/shared/components";
import { renderFormErrors } from "@/shared/utils";
import type { EditableNameForm } from "../../hooks";

type NameSectionProps = {
  form: EditableNameForm;
};

export const NameSection = ({ form }: NameSectionProps) => {
  const {
    nameField: { register, errors, isDirty, isValid, isEditing },
    controls: { submit, cancelEditing, toggleEditing },
    status: { isChangingName },
  } = form;

  return (
    <div>
      <p className="mb-1 text-xs text-muted-foreground/70 flex items-center gap-2">
        Full name
      </p>
      <form onSubmit={submit} className="space-y-2">
        <div className="flex items-center gap-2">
          <UserRound className="size-4 text-primary" />
          <Input
            {...register("name")}
            readOnly={!isEditing}
            disabled={isChangingName}
            enableValidationStyles={true}
            isValid={isValid}
            className={
              !isEditing
                ? "border-none px-0 text-base font-medium text-primary bg-transparent"
                : "text-base font-medium"
            }
          />
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={toggleEditing}
            className="rounded-full border-none bg-transparent text-primary hover:bg-primary/10"
          >
            <Pencil className="size-4" />
          </Button>
        </div>
        {renderFormErrors(errors.name)}
        {isEditing ? (
          <div className="flex gap-2">
            <Button
              type="submit"
              variant="submit"
              size="sm"
              className="w-fit font-normal"
              disabled={!isDirty || isChangingName || !isValid}
            >
              {isChangingName ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={cancelEditing}
            >
              Cancel
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  );
};
