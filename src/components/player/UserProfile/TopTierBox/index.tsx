import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { ImageWithFallback } from 'src/components/ui/Image/ImageWithFallback';
import {
  useGetMatchDivisionMeta,
  useGetMatchTypeMeta,
} from 'src/pages/api/hooks/useGetMetaQuery';
import { IUserProfile } from 'src/pages/api/hooks/query/useGetUserProfileQuery';
import { IMaxDivision } from 'src/pages/api/player/type';
import { OddsChart } from 'src/components/common/Chart/WinPercentChart';
import { RefetchButton } from 'src/components/common/RefetchButton';
import { IParamsNickName } from '..';
import * as S from './style';

export const UserTopTierBox = () => {
  const router = useRouter();
  const { nickName } = router.query as IParamsNickName;
  const queryClient = useQueryClient();
  const userProfileData = queryClient.getQueryData([
    'userProfile',
    nickName,
  ]) as IUserProfile;
  const userTopTierData = queryClient.getQueryData([
    'toptier',
    userProfileData.accessId,
  ]) as IMaxDivision[];

  const matchDivisionMetaQuery = useGetMatchDivisionMeta();
  const matchTypeMetaQuery = useGetMatchTypeMeta();

  if (matchDivisionMetaQuery.status === 'loading') {
    return <div>loading...</div>;
  }

  if (matchDivisionMetaQuery.status === 'success') {
    const choiceOfficialAndCoachGameImageIndex = () => {
      const MATCH_FILTER_CODE = [50];
      const { data: matchDivisionData } = matchDivisionMetaQuery.data;
      const filteredTopTierData = userTopTierData?.filter(({ matchType }) =>
        MATCH_FILTER_CODE.includes(matchType),
      );

      const newImageUrls: number[] = [];
      filteredTopTierData?.forEach(({ matchType, division }) => {
        const imageUrl = matchDivisionData.findIndex(
          ({ divisionId, divisionName }) => divisionId === division,
        );
        newImageUrls.push(imageUrl);
      });

      return newImageUrls;
    };

    const newState = choiceOfficialAndCoachGameImageIndex();

    // ToDo: fallbackSrc를 결정해주어야 함
    return (
      <S.TopTierWrap>
        <S.Flex>
          <S.FlexItem>
            <S.TopTierTitle>최고등급</S.TopTierTitle>
            <ImageWithFallback
              alt="공식모드티어아이콘"
              width={70}
              height={70}
              fallbackSrc={`https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank0.png`}
              src={`https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank${newState[0]}.png`}
            />
            <S.TopTierMode>공식모드</S.TopTierMode>
          </S.FlexItem>
          <S.FlexItem>
            <OddsChart
              data={[20, 2, 15]}
              // top={<div>20전 19승 1패</div>}
              bottom={<div>20전 19승 1패</div>}
            />
          </S.FlexItem>
          <S.FlexItem alignSelf="end">
            <RefetchButton />
          </S.FlexItem>
        </S.Flex>
      </S.TopTierWrap>
    );
  }

  return <div>loading...</div>;
  // 티어 data를 가져와서 이미지를 보여줘야한다.
};
