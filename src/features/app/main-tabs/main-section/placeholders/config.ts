import type { MainTabKey } from "@/features/app/types/main-tabs.types";
import type { LucideIcon } from "lucide-react";
import {
  MessageCircleMore,
  Settings,
  UserRound,
  Search,
  Users,
} from "lucide-react";

export type SimpleConfig = {
  icon: LucideIcon;
  title: string;
};

export type { MainTabKey };

const SIMPLE_CONFIGS: Record<MainTabKey, SimpleConfig> = {
  chats: {
    icon: MessageCircleMore,
    title: "Choose a chat ",
  },
  contacts: {
    icon: Users,
    title: "Choose a contact ",
  },
  search: {
    icon: Search,
    title: "Search a friend",
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
