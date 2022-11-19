import { QueryClient, useQuery, UseQueryResult } from 'react-query';
import { userAPI } from 'src/pages/api/player';

interface IDefaultProps {
  nickName: string;
}

export interface IUserProfile {
  accessId: string;
  nickname: string;
  level: number;
}

interface InsertFunc {
  <T extends string, Q>(nickName: T, queryClient?: Q): Q extends QueryClient
    ? () => Promise<void>
    : UseQueryResult<IUserProfile, unknown>;
}

// 사용하는 쪽에서는 상관이 없는데 함수에서 error가 나온다..왜그럴까..?
export const useGetUserProfileQuery: InsertFunc = (nickName, queryClient) => {
  const queryKeys = ['userProfile', nickName];
  const callApi = () => userAPI.getUserProfile(nickName);

  if (nickName && queryClient) {
    return async () => await queryClient.prefetchQuery(queryKeys, callApi);
  }
  return useQuery(queryKeys, callApi);
};
