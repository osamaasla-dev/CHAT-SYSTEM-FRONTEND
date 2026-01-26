import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  resetPasswordFormSchema,
  type ResetPasswordFormSchema,
} from "../../schemas";
import { useResetPassword } from "../useResetPassword";

interface UseResetPasswordFormParams {
  token?: string | null;
}

export function useResetPasswordForm({ token }: UseResetPasswordFormParams) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      token: token ?? "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useResetPassword();
  const isTokenMissing = !token;

  const onSubmit = handleSubmit((values) => {
    if (!values.token) {
      return;
    }

    mutate({ token: values.token, password: values.password });
  });

  return {
    register,
    errors,
    isValid,
    isPending,
    isTokenMissing,
    onSubmit,
  };
}
