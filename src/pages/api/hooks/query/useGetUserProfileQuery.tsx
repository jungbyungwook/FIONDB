import { QueryClient, useQuery, UseQueryResult } from 'react-query';
import { userAPI } from 'src/pages/api/player';
import { NickName } from '../../player/type';

interface IDefaultProps {
  nickName: string;
}

export interface IUserProfile {
  accessId: string;
  nickname: string;
  level: number;
}

interface InsertFunc {
  <T extends string, Q extends QueryClient | null>(
    nickName: T,
    queryClient?: Q,
  ): Q extends QueryClient
    ? () => Promise<void>
    : UseQueryResult<IUserProfile, unknown>;
}

// export const queryKeys = ['userProfile', nickName];
// export const callApi = () => userAPI.getUserProfile(nickName);

// 사용하는 쪽에서는 상관이 없는데 함수에서 error가 나온다..왜그럴까..?
// export const useGetUserProfileQuery: InsertFunc = (nickName, queryClient) => {
//   const queryKeys = ['userProfile', nickName];
//   const callApi = () => userAPI.getUserProfile(nickName);

//   if (nickName && queryClient) {
//     return async () => await queryClient.prefetchQuery(queryKeys, callApi);
//   }
//   return useQuery(queryKeys, callApi);
// };

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
