import { useMyProfile } from "@/features/app/main-tabs/my-profile";
import type { MyProfileInfo } from "@/features/app/main-tabs/my-profile/types/my-profile.types";

export type AccountStatus = MyProfileInfo["status"];
export type NormalizedAccountStatus = "ACTIVE" | "INACTIVE" | "BANNED";

const statusLabels: Record<NormalizedAccountStatus, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  BANNED: "Banned",
};

const statusToneClassNames: Record<NormalizedAccountStatus, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-600",
  INACTIVE: "bg-amber-50 text-amber-600",
  BANNED: "bg-red-50 text-red-600",
};

export const useAccountStatusInfo = () => {
  const { data } = useMyProfile();
  const rawStatus: AccountStatus = data?.status ?? "ACTIVE";
  const normalizedStatus: NormalizedAccountStatus =
    rawStatus === "ACTIVE" ? "ACTIVE" : rawStatus;

  const deletedAt = data?.deletedAt ? new Date(data.deletedAt) : null;
  const statusLabel = statusLabels[normalizedStatus] ?? "Unknown";
  const toneClassName =
    statusToneClassNames[normalizedStatus] ?? "bg-secondary text-primary";

  return {
    normalizedStatus,
    statusLabel,
    toneClassName,
    deletedAt,
    deletionDateLabel: deletedAt?.toLocaleDateString() ?? "",
    isActive: normalizedStatus === "ACTIVE",
    isInactive: normalizedStatus === "INACTIVE",
    isBanned: normalizedStatus === "BANNED",
    isScheduledForDeletion: Boolean(deletedAt),
  };
};
