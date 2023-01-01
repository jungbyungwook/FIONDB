import { useQueryClient } from 'react-query';

export const useRefetchMatchList = (accessId: string) => {
  const queryClient = useQueryClient();
  const refetchQuery = () =>
    queryClient.invalidateQueries(['matchList', accessId]);
  const queryState = queryClient.getQueryState(['matchList', accessId]);

  return { refetchQuery, queryState };
};
