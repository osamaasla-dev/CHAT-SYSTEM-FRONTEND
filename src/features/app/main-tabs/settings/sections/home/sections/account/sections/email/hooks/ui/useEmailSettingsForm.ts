import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMyProfile } from "@/features/app/main-tabs/my-profile";

import {
  changeEmailSchema,
  type ChangeEmailSchema,
} from "../../schemas/change-email.schama";
import { useChangeEmail } from "../useChangeEmail";

export const useEmailSettingsForm = () => {
  const { data } = useMyProfile();
  const currentEmail = data?.email ?? "—";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      newEmail: data?.email ?? "",
    },
  });

  const { mutateAsync: changeEmail, isPending } = useChangeEmail();

  useEffect(() => {
    if (data?.email) {
      reset({ newEmail: data.email });
    }
  }, [data?.email, reset]);

  const onSubmit = handleSubmit(async (values) => {
    await changeEmail(values);
    reset({ newEmail: data?.email ?? "" });
  });

  const resetToCurrentEmail = () => reset({ newEmail: data?.email ?? "" });
  const isBusy = isPending || isSubmitting;

  return {
    currentEmail,
    register,
    errors,
    isValid,
    isDirty,
    isBusy,
    onSubmit,
    resetToCurrentEmail,
  };
};
