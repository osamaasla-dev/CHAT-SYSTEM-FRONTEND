import { EmptyState, ErrorState, LoadingState } from "@/shared/components";

import { myProfileMessages } from "../messages";
import type { MyProfileInfo } from "../types";
import { resolveApiErrorMessage } from "@/shared/utils";
import { AvatarChangeDialog } from "./parts/AvatarChangeDialog";
import { AvatarSection } from "./parts/AvatarSection";
import { UsernameSection } from "./parts/UsernameSection";
import { NameSection } from "./parts/NameSection";
import { EmailSection } from "./parts/EmailSection";
import { useProfileTabController } from "./hooks/useProfileTabController";

type MyProfileTabProps = {
  data?: MyProfileInfo;
  error: Error | null;
  isLoading: boolean;
};

export const MyProfileTab = ({ data, error, isLoading }: MyProfileTabProps) => {
  const {
    nameForm,
    isUsernameCopied,
    handleCopyUsername,
    isAvatarModalOpen,
    openAvatarModal,
    handleAvatarModalChange,
    handleAvatarUpload,
    isChangingAvatar,
    handleDeleteAvatar,
    isDeletingAvatar,
  } = useProfileTabController(data);

  if (isLoading) return <LoadingState />;

  if (error)
    return (
      <ErrorState
        message={resolveApiErrorMessage(
          error.message,
          myProfileMessages.GENERAL,
        )}
      />
    );

  if (!data) return <EmptyState message="No data" />;

  return (
    <ul className="flex flex-1 flex-col gap-6">
      <li>
        <h1 className="text-xl  text-primary-dark">Profile</h1>
      </li>

      <AvatarSection
        name={data.name}
        avatarUrl={data.avatarUrl}
        isChangingAvatar={isChangingAvatar}
        onOpenChangeAvatar={openAvatarModal}
        onDeleteAvatar={handleDeleteAvatar}
        isDeletingAvatar={isDeletingAvatar}
      />

      <li className="flex flex-col gap-6 text-sm text-muted-foreground">
        <UsernameSection
          username={data.username}
          onCopy={handleCopyUsername}
          isCopied={isUsernameCopied}
        />

        <NameSection form={nameForm} />

        <EmailSection email={data.email} />
      </li>
      {isAvatarModalOpen && (
        <AvatarChangeDialog
          open={isAvatarModalOpen}
          onOpenChange={handleAvatarModalChange}
          onUpload={handleAvatarUpload}
          isUploading={isChangingAvatar}
        />
      )}
    </ul>
  );
};
