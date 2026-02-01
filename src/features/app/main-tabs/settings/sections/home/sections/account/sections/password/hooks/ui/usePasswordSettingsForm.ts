import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMyProfile } from "@/features/app/main-tabs/my-profile";

import {
  changePasswordSchema,
  type ChangePasswordSchema,
  type ChangePasswordRequest,
} from "../../schemas/change-password.schama";
import { useChangePassword } from "../useChangePassword";

const DEFAULT_VALUES: ChangePasswordSchema = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const usePasswordSettingsForm = () => {
  const { data } = useMyProfile();
  const hasPassword = Boolean(data?.hasPassword);
  const email = data?.email ?? "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: DEFAULT_VALUES,
  });

  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const onSubmit = handleSubmit(async (values) => {
    const payload: ChangePasswordRequest = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };

    await changePassword(payload);
    reset(DEFAULT_VALUES);
  });

  const resetForm = () => reset(DEFAULT_VALUES);
  const isBusy = isPending || isSubmitting;

  return {
    hasPassword,
    email,
    register,
    errors,
    isValid,
    isDirty,
    isBusy,
    onSubmit,
    resetForm,
  };
};
