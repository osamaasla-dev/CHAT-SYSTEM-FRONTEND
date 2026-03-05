import { X } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components";
import type { MessageReactionTabItem } from "../types/message.types";

type MessageReactionsDetailsPopoverHeaderProps = {
  activeTab: string;
  onTabChange: (value: string) => void;
  onTabHover: (value: string) => void;
  allTabValue: string;
  totalCount: number;
  tabs: MessageReactionTabItem[];
  onClose: () => void;
};

export const MessageReactionsDetailsPopoverHeader = ({
  activeTab,
  onTabChange,
  onTabHover,
  allTabValue,
  totalCount,
  tabs,
  onClose,
}: MessageReactionsDetailsPopoverHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-light bg-light px-3 py-2">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full gap-0">
        <TabsList className="flex w-full items-center gap-1">
          <TabsTrigger
            value={allTabValue}
            onMouseEnter={() => {
              onTabHover(allTabValue);
            }}
            onFocus={() => {
              onTabHover(allTabValue);
            }}
            className="cursor-pointer rounded-md px-2 py-1 text-sm text-primary-dark data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <span>All</span>
            <span className="ms-1 text-xs text-muted-foreground">{totalCount}</span>
          </TabsTrigger>

          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.emoji}
              value={tab.emoji}
              onMouseEnter={() => {
                onTabHover(tab.emoji);
              }}
              onFocus={() => {
                onTabHover(tab.emoji);
              }}
              className="cursor-pointer rounded-md px-2 py-1 text-sm text-primary-dark data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <span>{tab.emoji}</span>
              <span className="ms-1 text-xs text-muted-foreground">{tab.count}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <button
        type="button"
        onClick={onClose}
        className="ms-2 inline-flex cursor-pointer items-center justify-center rounded-full p-1 text-muted-foreground transition hover:bg-secondary hover:text-primary-dark"
        aria-label="Close reactions panel"
      >
        <X className="size-4" />
      </button>
    </div>
  );
};
