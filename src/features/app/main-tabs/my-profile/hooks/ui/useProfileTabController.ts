import { useState } from "react";

import type { MyProfileInfo } from "../../types";
import { useChangeAvatar, useDeleteAvatar } from "../../hooks";
import { useEditableNameForm } from "./useEditableNameForm";
import { useClipboardCopy } from "./useClipboardCopy";
import { useMediaUpload } from "@/features/media/hooks/useMediaUpload";

export const useProfileTabController = (data?: MyProfileInfo) => {
  const { mutate: changeAvatar, isPending: isChangingAvatarMutation } =
    useChangeAvatar();
  const { mutate: uploadMedia, isPending: isUploadingAvatar } =
    useMediaUpload();
  const { mutateAsync: deleteAvatar, isPending: isDeletingAvatar } =
    useDeleteAvatar();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const nameForm = useEditableNameForm(data?.name);
  const { isCopied: isUsernameCopied, copy } = useClipboardCopy();

  const handleCopyUsername = () => {
    if (!data?.username) {
      return;
    }

    void copy(data.username);
  };

  const openAvatarModal = () => setIsAvatarModalOpen(true);
  const closeAvatarModal = () => setIsAvatarModalOpen(false);
  const handleAvatarModalChange = (open: boolean) =>
    open ? openAvatarModal() : closeAvatarModal();

  const handleAvatarUpload = (file: File) => {
    const formData = new FormData();
    // Backend expects multipart/form-data with a single file; use generic field name "file"
    formData.append("file", file);

    uploadMedia(formData, {
      onSuccess: (result) => {
        const avatarMediaId = result.mediaId;

        changeAvatar(avatarMediaId, {
          onSuccess: closeAvatarModal,
        });
      },
    });
  };

  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatar();
    } catch {
      /* toast already handled in hook */
    }
  };

  return {
    nameForm,
    isUsernameCopied,
    handleCopyUsername,
    isAvatarModalOpen,
    openAvatarModal,
    closeAvatarModal,
    handleAvatarModalChange,
    handleAvatarUpload,
    isChangingAvatar: isChangingAvatarMutation || isUploadingAvatar,
    handleDeleteAvatar,
    isDeletingAvatar,
  };
};
