import { useIsMutating } from "@tanstack/react-query";

import { Button } from "@/shared/components";
import {
  useCreateBlock,
  CREATE_BLOCK_MUTATION_KEY,
} from "../hooks/useCreateBlock";
import {
  useUnblockUser,
  UNBLOCK_USER_MUTATION_KEY,
} from "../hooks/useUnblockUser";

type BlockButtonProps = {
  blockedUserId: string;
  isBlocked: boolean;
};

export const BlockButton = ({ blockedUserId, isBlocked }: BlockButtonProps) => {
  const { mutate: unblock } = useUnblockUser(blockedUserId);
  const { mutate: block } = useCreateBlock(blockedUserId);

  const isBlocking =
    useIsMutating({ mutationKey: CREATE_BLOCK_MUTATION_KEY(blockedUserId) }) >
    0;
  const isUnblocking =
    useIsMutating({ mutationKey: UNBLOCK_USER_MUTATION_KEY(blockedUserId) }) >
    0;

  const isMutatingForUser = isBlocking || isUnblocking;

  const handleClick = () => {
    if (isMutatingForUser) return;

    if (isBlocked) {
      unblock();
    } else {
      block();
    }
  };

  const label = isBlocked ? "Unblock" : "Block";

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
