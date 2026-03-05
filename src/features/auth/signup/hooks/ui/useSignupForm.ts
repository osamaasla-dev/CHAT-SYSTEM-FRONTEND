import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signupSchema, type SignupSchema } from "../../schemas";
import { useSignup } from "../useSignup";

export function useSignupForm() {
  const { mutate, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      name: "",
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
  };
}
