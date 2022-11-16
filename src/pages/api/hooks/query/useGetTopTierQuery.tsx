import { QueryClient, useQuery, UseQueryResult } from 'react-query';
import { AccessId, IMaxDivision, userAPI } from '../../player';

interface IGetQueryResponse {
  <T, Q>(accessId: T, queryClient?: Q): Q extends QueryClient
    ? () => Promise<void>
    : UseQueryResult<IMaxDivision, unknown>;
}

export const useGetTopTierQuery: IGetQueryResponse = (
  accessId: AccessId | undefined,
  queryClient?: QueryClient,
) => {
  if (!accessId) return;
  const queryKey = ['toptier', accessId];
  const queryFn = () => userAPI.getUserTopTier(accessId);

  if (queryClient) {
    return async () => await queryClient.prefetchQuery(queryKey, queryFn);
  }

  return useQuery(queryKey, queryFn);
};
