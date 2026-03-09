import { useQuery } from "@tanstack/react-query";

import { MyProfileApi } from "@/features/app/main-tabs/my-profile/services";

export const MY_PROFILE_QUERY_KEY = ["my-profile"] as const;

type UseMyProfileOptions = {
  enabled?: boolean;
};

export const useMyProfile = (options?: UseMyProfileOptions) => {
  const query = useQuery({
    queryKey: MY_PROFILE_QUERY_KEY,
    queryFn: MyProfileApi,
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });

  return query;
};
