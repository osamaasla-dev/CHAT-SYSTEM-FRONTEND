import {
  MessageCircleMore,
  Search,
  Settings,
  UserRound,
  Users,
} from "lucide-react";

import { TabsList, TabsTrigger } from "@/shared/components";
import type { MainTabKey } from "@/features/app/types/main-tabs.types";
import { toSafeImageUrl } from "@/shared/utils";

type AppSidebarTabsProps = {
  unreadChatsBadgeCount: number;
  avatarUrl: string | null | undefined;
  avatarName: string | undefined;
  onSelectTab: (tab: MainTabKey) => void;
};

export const AppSidebarTabs = ({
  unreadChatsBadgeCount,
  avatarUrl,
  avatarName,
  onSelectTab,
}: AppSidebarTabsProps) => {
  const safeAvatarUrl = toSafeImageUrl(avatarUrl);

  return (
    <TabsList className="flex h-full w-15 flex-col items-center gap-4 rounded-none border-r-2 border-gray-light bg-secondary py-4">
      <TabsTrigger
        value="chats"
        onClick={() => onSelectTab("chats")}
        className="cursor-pointer rounded-full hover:bg-light data-[state=active]:bg-light"
      >
        <span className="relative block rounded-full p-2">
          <MessageCircleMore className="size-6 text-primary" />
          {unreadChatsBadgeCount > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
              {unreadChatsBadgeCount > 99 ? "99+" : unreadChatsBadgeCount}
            </span>
          )}
        </span>
      </TabsTrigger>

      <TabsTrigger
        value="contacts"
        onClick={() => onSelectTab("contacts")}
        className="cursor-pointer rounded-full hover:bg-light data-[state=active]:bg-light"
      >
        <span className="block rounded-full p-2">
          <Users className="size-6 text-primary" />
        </span>
      </TabsTrigger>

      <TabsTrigger
        value="search"
        onClick={() => onSelectTab("search")}
        className="cursor-pointer rounded-full hover:bg-light data-[state=active]:bg-light"
      >
        <span className="block rounded-full p-2">
          <Search className="size-6 text-primary" />
        </span>
      </TabsTrigger>

      <TabsTrigger
        value="settings"
        onClick={() => onSelectTab("settings")}
        className="mt-auto cursor-pointer rounded-full hover:bg-light data-[state=active]:bg-light"
      >
        <span className="block rounded-full p-2">
          <Settings className="size-6 text-primary" />
        </span>
      </TabsTrigger>

      <TabsTrigger
        value="my-profile"
        onClick={() => onSelectTab("my-profile")}
        className="cursor-pointer rounded-full bg-light hover:bg-light data-[state=active]:bg-light"
      >
        {safeAvatarUrl ? (
          <img
            src={safeAvatarUrl}
            alt={avatarName ?? "Profile avatar"}
            className="size-10 rounded-full"
          />
        ) : (
          <UserRound className="size-10 text-gray-light" />
        )}
      </TabsTrigger>
    </TabsList>
  );
};
