import { getMatchInfo } from 'api/user/getMatchInfo';
import { useQuery } from 'react-query';

export const useGetMatchInfo = (matchId: string) => {
  const matchDetailQuery = useQuery(['matchInfo', matchId], () =>
    getMatchInfo(matchId),
  );

  return matchDetailQuery;
};
