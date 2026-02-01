import { UserRound, MessageCircleMore, Settings } from "lucide-react";

import { useCheckToken } from "@/features/auth/token-introspect/hooks";
import { SpinnerLayer } from "@/shared/components";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components";
import { ErrorState } from "@/shared/components";
import { resolveApiErrorMessage } from "@/shared/utils";
import { MyProfileTab, useMyProfile } from "../main-tabs/my-profile";
import { useState } from "react";
import { MainSection } from "../main-tabs/main-section";
import { SettingsTab } from "../main-tabs/settings";

export const AppPage = () => {
  const { isPending, error } = useCheckToken();

  const { data, error: profileError, isLoading } = useMyProfile();

  const [selectedTab, setSelectedTab] = useState<
    "chats" | "settings" | "my-profile"
  >("chats");

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
      <section className="flex w-full flex-col border-r-2 border-gray-light bg-light shadow-lg lg:w-1/3">
        <Tabs
          defaultValue="chats"
          orientation="vertical"
          className="flex h-full gap-0"
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

          <div className="flex flex-1 flex-col  bg-light p-4 mb-4 overflow-y-auto">
            <TabsContent value="chats" className="flex flex-1 flex-col gap-6">
              <div className="text-end">
                <p className="text-sm text-muted-foreground">الدردشات</p>
                <h1 className="text-2xl font-semibold text-primary-dark">
                  كل المحادثات
                </h1>
              </div>
              <p className="text-base text-primary-dark/80">
                سيتم إظهار قائمة الدردشات الخاصة بك هنا مع آخر الرسائل والوقت.
              </p>
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
        </Tabs>
      </section>

      <MainSection tab={selectedTab} />
    </div>
  );
};
