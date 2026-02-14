import { Button } from "@/shared/components";
import { useBlockButtonLogic } from "../hooks/ui/useBlockButtonLogic";

type BlockButtonProps = {
  blockedUserId: string;
  isBlocked: boolean;
};

export const BlockButton = ({ blockedUserId, isBlocked }: BlockButtonProps) => {
  const { label, isMutatingForUser, handleClick } = useBlockButtonLogic({
    blockedUserId,
    isBlocked,
  });

  return (
    <Button
      variant="submit"
      size="sm"
      className="h-fit py-1 px-2 text-sm font-normal"
      type="button"
      disabled={isMutatingForUser}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};
