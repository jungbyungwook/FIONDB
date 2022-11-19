import { QueryClient, useQuery } from 'react-query';

const useGetSoccerPlayerName = () => {
  const queryKey = ['toptier', accessId];
  const queryFn = () => userAPI.getUserTopTier(accessId);
  return useQuery(queryKey, queryFn);
};
