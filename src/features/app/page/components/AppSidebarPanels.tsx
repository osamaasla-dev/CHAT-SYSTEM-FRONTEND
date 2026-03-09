import { TabsContent } from "@/shared/components";
import {
  ChatsTab,
  ContactsTab,
  MyProfileTab,
  SearchTab,
  SettingsTab,
} from "@/features/app/main-tabs";
import type { MyProfileInfo } from "@/features/app/main-tabs/my-profile/types";

type AppSidebarPanelsProps = {
  profile: MyProfileInfo | undefined;
  isLoadingProfile: boolean;
  profileError: Error | null;
};

export const AppSidebarPanels = ({
  profile,
  isLoadingProfile,
  profileError,
}: AppSidebarPanelsProps) => {
  return (
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

      <TabsContent value="my-profile" className="flex flex-1 flex-col gap-6">
        <MyProfileTab
          data={profile}
          isLoading={isLoadingProfile}
          error={profileError}
        />
      </TabsContent>
    </div>
  );
};
