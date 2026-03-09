import { useCheckToken } from "@/features/auth/token-introspect/hooks";
import { SpinnerLayer } from "@/shared/components";
import { Tabs } from "@/shared/components";
import { ErrorState } from "@/shared/components";
import { resolveApiErrorMessage } from "@/shared/utils";
import { useCallback, useState } from "react";
import { useWebSocket } from "@/features/websocket";
import { useNavigate } from "react-router-dom";
import { useOfflineMessageOutbox } from "@/features/messages";
import { useNotificationsUnreadCount } from "@/features/notifications";
import { useMyProfile, MainSection } from "../main-tabs";
import type { MainTabKey } from "../types/main-tabs.types";
import { AppSidebarPanels, AppSidebarTabs } from "./components";

export const AppPage = () => {
  const { isPending, error, isSuccess } = useCheckToken();
  const navigate = useNavigate();

  const {
    data,
    error: profileError,
    isLoading,
  } = useMyProfile({ enabled: isSuccess });
  const { data: unreadNotificationsData } = useNotificationsUnreadCount({
    enabled: isSuccess,
  });

  const [selectedTab, setSelectedTab] = useState<MainTabKey>("chats");
  const unreadChatsBadgeCount = unreadNotificationsData?.unreadCount ?? 0;
  const handleForcedDisconnect = useCallback(() => {
    navigate("/forced-disconnect", { replace: true });
  }, [navigate]);
  const handleUnauthorized = useCallback(() => {
    navigate("/login", { replace: true });
  }, [navigate]);

  // Initialize global websocket connection for the app lifecycle
  useWebSocket({
    enabled: isSuccess,
    onForcedDisconnect: handleForcedDisconnect,
    onUnauthorized: handleUnauthorized,
  });
  useOfflineMessageOutbox({ enabled: isSuccess });

  if (isPending) {
    return <SpinnerLayer />;
  }

  if (error || profileError) {
    return (
      <ErrorState
        message={resolveApiErrorMessage(
          error?.message || profileError?.message || "Something went wrong",
        )}
      />
    );
  }

  return (
    <div className="flex h-screen min-h-[620px] bg-secondary text-primary-dark">
      <section className="w-full">
        <Tabs defaultValue="chats" orientation="vertical" className="h-full gap-0">
          <AppSidebarTabs
            unreadChatsBadgeCount={unreadChatsBadgeCount}
            avatarUrl={data?.avatarUrl}
            avatarName={data?.name}
            onSelectTab={setSelectedTab}
          />
          <div className="flex flex-1">
            <AppSidebarPanels
              profile={data}
              isLoadingProfile={isLoading}
              profileError={profileError}
            />

            <MainSection tab={selectedTab} className="w-2/3" />
          </div>
        </Tabs>
      </section>
    </div>
  );
};
