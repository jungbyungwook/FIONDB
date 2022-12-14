import { QueryClient, useQuery, UseQueryResult } from 'react-query';
import { userAPI } from 'src/pages/api/player';
import type { AccessId, IMaxDivision } from 'src/pages/api/player/type';

// interface IGetQueryResponse {
//   <T, Q>(accessId: T, queryClient?: Q): Q extends QueryClient
//     ? () => Promise<void>
//     : UseQueryResult<IMaxDivision[], unknown>;
// }

// export const useGetTopTierQuery: IGetQueryResponse = (
//   accessId: AccessId | undefined,
//   queryClient?: QueryClient,
// ) => {
//   if (!accessId) return;
//   const queryKey = ['toptier', accessId];
//   const queryFn = () => userAPI.getUserTopTier(accessId);

//   if (queryClient) {
//     return async () => await queryClient.prefetchQuery(queryKey, queryFn);
//   }

//   return useQuery(queryKey, queryFn);
// };

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
