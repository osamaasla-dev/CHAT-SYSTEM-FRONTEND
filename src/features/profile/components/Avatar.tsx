import { UserRound } from "lucide-react";

import { cn } from "@/shared/utils";
import { toSafeImageUrl } from "@/shared/utils";

type AvatarProps = {
  avatarUrl: string | null;
  name: string;
  classNameImg?: string;
  classNameIcon?: string;
};

export const Avatar = ({
  avatarUrl,
  name,
  classNameImg,
  classNameIcon,
}: AvatarProps) => {
  const safeAvatarUrl = toSafeImageUrl(avatarUrl);

  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center overflow-hidden rounded-full border border-secondary",
        classNameImg,
      )}
    >
      {safeAvatarUrl ? (
        <img src={safeAvatarUrl} alt={name} className="size-full object-cover" />
      ) : (
        <UserRound
          className={cn("size-8 self-end text-gray-light", classNameIcon)}
        />
      )}
    </div>
  );
};
