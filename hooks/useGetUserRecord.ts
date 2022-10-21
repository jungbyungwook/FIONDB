import { useQuery } from 'react-query';
// import { getUserMatch } from 'api/user/getUserMatch';
import { getUserMatch } from 'src/pages/api/user/getUserMatch';
import { getUserTopTier } from 'src/pages/api/user/getUserTopTier';
// import { getUserTopTier } from 'api/user/getUserTopTier';

const useGetUserRecord = (accessId: string = '') => {
  const userMatchQuery = useQuery(['userMatch'], () => getUserMatch(accessId), {
    enabled: !!accessId,
  });
  const userTopTierQuery = useQuery(
    ['userTopTier'],
    () => getUserTopTier(accessId),
    {
      enabled: !!accessId,
    },
  );

  return { userMatchQuery, userTopTierQuery };
};

export default useGetUserRecord;
