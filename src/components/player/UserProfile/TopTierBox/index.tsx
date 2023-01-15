import { useRouter } from 'next/router';

import { useGetMatchDivisionMeta } from 'src/pages/api/hooks/useGetMetaQuery';
import { ImageWithFallback } from 'src/components/ui/Image/ImageWithFallback';
import { useCaseUserProfile } from 'src/useCases/useCaseUserProfile';

import { IParamsNickName } from '..';
import * as S from './style';

export const UserTopTierBox = () => {
  const router = useRouter();
  const { nickName } = router.query as IParamsNickName;

  const { useGetUserProfileQuery, useGetTopTierQuery } = useCaseUserProfile();

  const { data: userProfileData } = useGetUserProfileQuery(nickName);
  const { data: userTopTierData } = useGetTopTierQuery(
    userProfileData?.accessId || '',
  );

  const matchDivisionMetaQuery = useGetMatchDivisionMeta();

  if (matchDivisionMetaQuery.status === 'success') {
    const choiceOfficialAndCoachGameImageIndex = (
      matchDivisionCodes = [50],
    ) => {
      const { data: matchDivisionData } = matchDivisionMetaQuery.data;

      const userDivisions = matchDivisionCodes.map((CODE) => {
        return userTopTierData?.find(({ matchType }) => matchType === CODE)
          ?.division;
      });

      const rankIds = userDivisions.map((userDivision) => {
        return matchDivisionData.findIndex(
          ({ divisionId }) => divisionId === userDivision,
        );
      });

      return rankIds;
    };

    const rankIds = choiceOfficialAndCoachGameImageIndex();

    // ToDo: fallbackSrc를 결정해주어야 함
    return (
      <S.TopTierWrap>
        <S.Flex>
          <S.FlexItem>
            <S.TopTierTitle>공식모드</S.TopTierTitle>
            {rankIds.map((rankId, index) => (
              <ImageWithFallback
                key={`${rankId}${index}`}
                alt="티어아이콘"
                width={95}
                height={95}
                fallbackSrc={`https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank0.png`}
                src={`https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank${rankId}.png`}
                blurDataURL={`https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank${rankId}.png`}
                placeholder="blur"
              />
            ))}
            <S.TopTierMode>최고등급</S.TopTierMode>
          </S.FlexItem>
        </S.Flex>
      </S.TopTierWrap>
    );
  }

  return null;
};
