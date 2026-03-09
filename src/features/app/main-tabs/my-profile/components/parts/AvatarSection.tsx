import { useState } from "react";
import { Camera, UserRound } from "lucide-react";

import {
  Button,
  ConfirmDialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components";
import { toSafeImageUrl } from "@/shared/utils";

type AvatarSectionProps = {
  name: string;
  avatarUrl?: string | null;
  isChangingAvatar: boolean;
  onOpenChangeAvatar: () => void;
  onDeleteAvatar: () => Promise<void> | void;
  isDeletingAvatar?: boolean;
};

export const AvatarSection = ({
  name,
  avatarUrl,
  isChangingAvatar,
  onOpenChangeAvatar,
  onDeleteAvatar,
  isDeletingAvatar = false,
}: AvatarSectionProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const safeAvatarUrl = toSafeImageUrl(avatarUrl);

  return (
    <li className="flex flex-col items-center gap-4 text-center">
      <div className="flex size-32 items-center justify-center overflow-hidden rounded-full border-4 border-primary-light">
        {safeAvatarUrl ? (
          <img src={safeAvatarUrl} alt={name} className="size-full object-cover" />
        ) : (
          <UserRound className="size-25 text-gray-light self-end" />
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full border-primary/40 text-primary"
            disabled={isChangingAvatar || isDeletingAvatar}
          >
            <Camera className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="min-w-[180px] border border-primary/10"
        >
          <DropdownMenuItem
            onClick={onOpenChangeAvatar}
            className="cursor-pointer"
            disabled={isDeletingAvatar}
          >
            Change Avatar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsConfirmOpen(true)}
            className="cursor-pointer"
            disabled={!safeAvatarUrl || isDeletingAvatar}
          >
            Delete Avatar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title="Delete avatar"
        description="This action cannot be undone"
        confirmLabel="Delete"
        confirmVariant="delete"
        isConfirming={isDeletingAvatar}
        onConfirm={onDeleteAvatar}
      />
    </li>
  );
};
