import { useQuery, QueryClient } from 'react-query';
import { userAPI } from 'src/pages/api/player';
import { AccessId } from 'src/pages/api/player/type';

export const useCaseUserProfile = () => {
  const useGetUserProfileQuery = (nickName: string) => {
    const queryKeys = ['userProfile', nickName];
    const callApi = () => userAPI.getUserProfile(nickName);

    return useQuery(queryKeys, callApi);
  };

  const useGetUserProfilePrefetchQuery = (
    nickName: string,
    queryClient: QueryClient,
  ) => {
    const queryKeys = ['userProfile', nickName];
    const callApi = () => userAPI.getUserProfile(nickName);

    return async () => await queryClient.prefetchQuery(queryKeys, callApi);
  };

  const useGetTopTierQuery = (accessId: AccessId) => {
    const queryKey = ['toptier', accessId];
    const callAPI = () => userAPI.getUserTopTier(accessId);

    return useQuery(queryKey, callAPI);
  };

  const useGetTopTierPrefetchQuery = (
    accessId: AccessId,
    queryClient: QueryClient,
  ) => {
    const queryKey = ['toptier', accessId];
    const callAPI = () => userAPI.getUserTopTier(accessId);

    return async () => await queryClient.prefetchQuery(queryKey, callAPI);
  };

  return {
    useGetTopTierQuery,
    useGetTopTierPrefetchQuery,
    useGetUserProfileQuery,
    useGetUserProfilePrefetchQuery,
  };
};
