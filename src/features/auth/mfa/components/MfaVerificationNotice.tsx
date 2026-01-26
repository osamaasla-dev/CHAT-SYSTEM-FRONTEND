import { Button } from "@/shared/components";

interface MfaVerificationNoticeProps {
  cooldown: number;
  cooldownLabel: string;
  isBusy: boolean;
  onResend: () => void;
}

export function MfaVerificationNotice({
  cooldown,
  cooldownLabel,
  isBusy,
  onResend,
}: MfaVerificationNoticeProps) {
  const isDisabled = cooldown > 0 || isBusy;

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-secondary/60 px-5 py-4 text-dark sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-dark">Email verification</p>
        <p className="text-xs text-muted-foreground">
          Codes expire fast. Request another if the timer runs out.
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={onResend}
        disabled={isDisabled}
      >
        {isDisabled ? `Resend in ${cooldownLabel}` : "Send code"}
      </Button>
    </div>
  );
}
