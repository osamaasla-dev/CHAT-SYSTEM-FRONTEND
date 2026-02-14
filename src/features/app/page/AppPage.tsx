import {
  Search,
  UserRound,
  MessageCircleMore,
  Settings,
  Users,
} from "lucide-react";

import { useCheckToken } from "@/features/auth/token-introspect/hooks";
import { SpinnerLayer } from "@/shared/components";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components";
import { ErrorState } from "@/shared/components";
import { resolveApiErrorMessage } from "@/shared/utils";
import { useState } from "react";
import { useWebSocket } from "@/features/websocket";
import {
  useMyProfile,
  SearchTab,
  SettingsTab,
  MyProfileTab,
  MainSection,
  ContactsTab,
  ChatsTab,
} from "../main-tabs";
import type { MainTabKey } from "../types/main-tabs.types";

export const AppPage = () => {
  const { isPending, error, isSuccess } = useCheckToken();

  const { data, error: profileError, isLoading } = useMyProfile();

  const [selectedTab, setSelectedTab] = useState<MainTabKey>("chats");

  // Initialize global websocket connection for the app lifecycle
  useWebSocket({ enabled: isSuccess });

  if (isPending) {
    return <SpinnerLayer />;
  }

  if (error || profileError) {
    return (
      <ErrorState
        message={resolveApiErrorMessage(
          error?.message || "Something went wrong",
        )}
      />
    );
  }

  return (
    <div className="flex h-screen min-h-[620px] bg-secondary text-primary-dark">
      <section className="w-full">
        <Tabs
          defaultValue="chats"
          orientation="vertical"
          className=" h-full gap-0"
        >
          <TabsList className="flex h-full w-15 flex-col items-center gap-4 rounded-none border-r-2 border-gray-light bg-secondary py-4">
            <TabsTrigger
              value="chats"
              onClick={() => setSelectedTab("chats")}
              className="cursor-pointer rounded-full hover:bg-light data-[state=active]:bg-light"
            >
              <span className=" block rounded-full p-2">
                <MessageCircleMore className="size-6  text-primary" />
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              onClick={() => setSelectedTab("contacts")}
              className="cursor-pointer rounded-full hover:bg-light data-[state=active]:bg-light"
            >
              <span className=" block rounded-full p-2">
                <Users className="size-6  text-primary" />
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="search"
              onClick={() => setSelectedTab("search")}
              className="cursor-pointer rounded-full hover:bg-light data-[state=active]:bg-light"
            >
              <span className="block rounded-full p-2">
                <Search className="size-6 text-primary" />
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              onClick={() => setSelectedTab("settings")}
              className="mt-auto cursor-pointer rounded-full hover:bg-light data-[state=active]:bg-light"
            >
              <span className="block rounded-full p-2">
                <Settings className="size-6 text-primary" />
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="my-profile"
              onClick={() => setSelectedTab("my-profile")}
              className="cursor-pointer rounded-full bg-light hover:bg-light data-[state=active]:bg-light"
            >
              {data?.avatarUrl ? (
                <img
                  src={data?.avatarUrl}
                  alt={data?.name}
                  className="size-10 rounded-full"
                />
              ) : (
                <UserRound className="size-10 text-gray-light" />
              )}
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-1">
            <div className="bg-light border-r-2 border-gray-light w-1/3 flex flex-col gap-6 p-3">
              <TabsContent value="chats" className="flex flex-1 flex-col gap-6">
                <ChatsTab />
              </TabsContent>
              <TabsContent
                value="contacts"
                className="flex flex-1 flex-col gap-6 overflow-y-auto"
              >
                <ContactsTab />
              </TabsContent>

              <TabsContent
                value="search"
                className="flex flex-1 flex-col gap-6 overflow-y-auto"
              >
                <SearchTab />
              </TabsContent>
              <TabsContent
                value="settings"
                className="flex flex-1 flex-col gap-6 overflow-y-auto"
              >
                <SettingsTab />
              </TabsContent>

              <TabsContent
                value="my-profile"
                className="flex flex-1 flex-col gap-6"
              >
                <MyProfileTab data={data} isLoading={isLoading} error={error} />
              </TabsContent>
            </div>

            <MainSection tab={selectedTab} className="w-2/3" />
          </div>
        </Tabs>
      </section>
    </div>
  );
};
