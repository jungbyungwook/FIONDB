import { QueryClient, useQuery } from 'react-query';

import { userAPI } from 'src/pages/api/player';
import type { AccessId } from 'src/pages/api/player/type';

export const useGetTopTierQuery = (accessId: AccessId | undefined) => {
  if (!accessId) return;
  const queryKey = ['toptier', accessId];
  const callAPI = () => userAPI.getUserTopTier(accessId);

  return useQuery(queryKey, callAPI);
};

export const useGetTopTierPrefetchQuery = (
  accessId: AccessId,
  queryClient: QueryClient,
) => {
  const queryKey = ['toptier', accessId];
  const callAPI = () => userAPI.getUserTopTier(accessId);

  return async () => await queryClient.prefetchQuery(queryKey, callAPI);
};
