import { useRouter } from 'next/router';

import { OddsChart } from 'src/components/common/Chart/WinPercentChart';
import { useCaseStatisticsMatch } from 'src/useCases/useCaseStatisticsMatch';
import { useCaseUserProfile } from 'src/useCases/useCaseUserProfile';
import { IParamsNickName } from '../UserProfileContainer';

export const UserChartBox = () => {
  const router = useRouter();
  const { nickName } = router.query as IParamsNickName;

  const userProfileQuery = useCaseUserProfile();
  const { data } = userProfileQuery.useGetUserProfileQuery(nickName);
  const { getOdds } = useCaseStatisticsMatch(nickName);

  const [win, tie, lose] = getOdds();

  return (
    <div>
      <OddsChart
        data={[win, tie, lose]}
        bottom={<div>{`${win}승 ${tie}무 ${lose}패`}</div>}
      />
    </div>
  );
};
