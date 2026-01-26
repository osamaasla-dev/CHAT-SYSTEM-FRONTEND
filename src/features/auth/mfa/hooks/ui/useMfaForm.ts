import { useCallback, useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { mfaCodeSchema, type MfaCodeSchema } from "../../schemas";
import { useMfaChallenge } from "../useMfaChallenge";
import { useMfaVerify } from "../useMfaVerify";

export function useMfaForm() {
  const { mutate: triggerChallenge, isPending: isSending } = useMfaChallenge();
  const { mutate: verifyCode, isPending: isVerifying } = useMfaVerify();

  const [cooldown, setCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<MfaCodeSchema>({
    resolver: zodResolver(mfaCodeSchema),
    mode: "onChange",
    defaultValues: { code: "" },
  });

  const isBusy = isSending || isVerifying;

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setCooldown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [cooldown]);

  const requestChallenge = useCallback(() => {
    triggerChallenge(undefined, {
      onSuccess: (response) => {
        const expiresIn = response.data.expiresIn ?? 0;
        setCooldown(expiresIn);
      },
    });
  }, [triggerChallenge]);

  const cooldownLabel = useMemo(() => {
    const minutes = Math.floor(cooldown / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(cooldown % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  }, [cooldown]);

  const handleResend = useCallback(() => {
    if (cooldown > 0 || isBusy) {
      return;
    }

    reset();
    requestChallenge();
  }, [cooldown, isBusy, reset, requestChallenge]);

  const onSubmit = handleSubmit((values) => {
    verifyCode(values);
  });

  return {
    register,
    errors,
    isValid,
    onSubmit,
    cooldown,
    cooldownLabel,
    handleResend,
    isBusy,
    isVerifying,
  };
}
