import { useRouter } from 'next/router';

import { OddsChart } from 'src/components/common/Chart/WinPercentChart';
import { useCaseStatisticsMatch } from 'src/useCases/useCaseStatisticsMatch';
import { useCaseUserProfile } from 'src/useCases/useCaseUserProfile';
import styled from 'styled-components';
import { IParamsNickName } from '../UserProfileContainer';

export const UserChartBox = () => {
  const router = useRouter();
  const { nickName } = router.query as IParamsNickName;

  const userProfileQuery = useCaseUserProfile();
  const { data } = userProfileQuery.useGetUserProfileQuery(nickName);
  const { getOdds } = useCaseStatisticsMatch(nickName);

  const [win, tie, lose] = getOdds();

  return (
    <OddsChart
      data={[win, tie, lose]}
      bottom={
        <S.OddsChartBottom>{`${win}승 ${tie}무 ${lose}패`}</S.OddsChartBottom>
      }
    />
  );
};

const S = {
  OddsChartBottom: styled.div`
    font-size: ${({ theme }) => theme.fontSizes.content[16]};

    @media ${({ theme }) => theme.media.small} {
      font-size: ${({ theme }) => theme.fontSizes.content[12]};
    }
  `,
};
