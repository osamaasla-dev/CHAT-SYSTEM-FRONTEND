import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { changeNameSchema, type ChangeNameSchema } from "../../schemas";
import { useChangeName } from "../../hooks";

export const useEditableNameForm = (initialName?: string | null) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isDirty, isValid },
  } = useForm<ChangeNameSchema>({
    resolver: zodResolver(changeNameSchema),
    defaultValues: { name: initialName ?? "" },
    mode: "onChange",
  });

  const { mutate: changeName, isPending: isChangingName } = useChangeName();
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    reset({ name: initialName ?? "" });
  }, [initialName, reset]);

  useEffect(() => {
    if (isEditingName) {
      setTimeout(() => setFocus("name"), 0);
    }
  }, [isEditingName, setFocus]);

  const submit = handleSubmit((values) =>
    changeName(values, {
      onSuccess: () => setIsEditingName(false),
    }),
  );

  const cancelEditing = () => {
    reset({ name: initialName ?? "" });
    setIsEditingName(false);
  };

  const toggleEditing = () => setIsEditingName((prev) => !prev);

  return {
    nameField: {
      register,
      isEditing: isEditingName,
      isDirty,
      isValid,
      errors,
    },
    controls: {
      submit,
      cancelEditing,
      toggleEditing,
    },
    status: {
      isEditingName,
      isChangingName,
    },
  };
};

export type EditableNameForm = ReturnType<typeof useEditableNameForm>;
