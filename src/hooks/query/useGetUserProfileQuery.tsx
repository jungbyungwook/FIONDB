import { QueryClient, useQuery, UseQueryResult } from 'react-query';
import { userAPI } from 'src/pages/api/player';

export interface IUserProfile {
  accessId: string;
  nickname: string;
  level: number;
}

export const useGetUserProfileQuery = (nickName: string) => {
  const queryKeys = ['userProfile', nickName];
  const callApi = () => userAPI.getUserProfile(nickName);

  return useQuery(queryKeys, callApi);
};

export const useGetUserProfilePrefetchQuery = (
  nickName: string,
  queryClient: QueryClient,
) => {
  const queryKeys = ['userProfile', nickName];
  const callApi = () => userAPI.getUserProfile(nickName);

  return async () => await queryClient.prefetchQuery(queryKeys, callApi);
};
