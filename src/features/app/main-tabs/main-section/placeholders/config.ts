import type { LucideIcon } from "lucide-react";
import { MessageCircleMore, Settings, UserRound } from "lucide-react";

export type MainTabKey = "chats" | "settings" | "my-profile";

export type SimpleConfig = {
  icon: LucideIcon;
  title: string;
};

const SIMPLE_CONFIGS: Record<MainTabKey, SimpleConfig> = {
  chats: {
    icon: MessageCircleMore,
    title: "Choose a chat ",
  },
  settings: {
    icon: Settings,
    title: "Settings",
  },
  "my-profile": {
    icon: UserRound,
    title: "Profile",
  },
};

export const getSimpleConfig = (tab: MainTabKey): SimpleConfig =>
  SIMPLE_CONFIGS[tab];
