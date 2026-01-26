import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema, type LoginSchema } from "../../schemas";
import { useLogin } from "../useLogin";

export function useLoginForm() {
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting, isValid, isSubmitSuccessful },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((values) =>
    mutate(values, {
      onSuccess: () => reset(),
    }),
  );

  const isBusy = isPending || isSubmitting;

  return {
    register,
    errors,
    isValid,
    isSubmitSuccessful,
    isBusy,
    onSubmit,
    getValues,
  };
}
