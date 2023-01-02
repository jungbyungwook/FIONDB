import { QueryClient, useQuery } from 'react-query';
import { userAPI } from 'src/pages/api/player';
import { NickName } from '../../player/type';

export interface IUserProfile {
  accessId: string;
  nickname: string;
  level: number;
}

export const useGetUserProfileQuery = (nickName: NickName) => {
  const queryKeys = ['userProfile', nickName];
  const callApi = () => userAPI.getUserProfile(nickName);

  return useQuery(queryKeys, callApi);
};

export const useGetUserProfilePrefetchQuery = (
  nickName: NickName,
  queryClient: QueryClient,
) => {
  const queryKeys = ['userProfile', nickName];
  const callApi = () => userAPI.getUserProfile(nickName);

  return async () => await queryClient.prefetchQuery(queryKeys, callApi);
};
