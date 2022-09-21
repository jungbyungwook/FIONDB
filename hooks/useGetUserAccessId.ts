import { useQuery } from 'react-query';
import { getUserAccessId } from 'api/user/getUserAccessId';

export const useGetUserAccessId = (nickName: string) => {
  const getUserAccessIdQuery = useQuery(
    ['userAccessId'],
    () => getUserAccessId(nickName),
    {
      enabled: !!nickName,
    },
  );

  return getUserAccessIdQuery;
};
