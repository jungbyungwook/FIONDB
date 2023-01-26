import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useGetMatchDivisionMeta } from 'src/pages/api/hooks/useGetMetaQuery';
import { ImageWithFallback } from 'src/components/common/Image/ImageWithFallback';
import { useCaseUserProfile } from 'src/useCases/useCaseUserProfile';

import { IParamsNickName } from '../UserProfileContainer';

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

const S = {
  TopTierWrap: styled.div`
    text-align: center;
  `,
  Flex: styled.div`
    display: flex;
    align-items: flex-end;
    gap: 3rem;
    font-size: ${({ theme }) => theme.fontSizes.subTitle[18]};
  `,
  FlexItem: styled.div<{ alignSelf?: 'start' | 'center' | 'end' }>`
    align-self: ${({ alignSelf }) => alignSelf && alignSelf};
  `,
  TopTierTitle: styled.div`
    margin-bottom: 1.2rem;
    font-size: ${({ theme }) => theme.fontSizes.content[16]};
  `,
  TopTierMode: styled.div`
    height: 30%;
    margin-top: 1.2rem;
    font-size: ${({ theme }) => theme.fontSizes.subTitle[20]};
  `,
};
