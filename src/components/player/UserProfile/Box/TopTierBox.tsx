import styled from 'styled-components';
import { useRouter } from 'next/router';

import { ImageWithFallback } from 'src/components/common/Image/ImageWithFallback';
import { useCaseUserProfile } from 'src/useCases/useCaseUserProfile';
import { useCaseGetMetaData } from 'src/useCases/useCaseGetMetaData';
import { IParamsNickName } from '../UserProfileContainer';
import { MATCH_META_DATA } from 'src/constants/matchMeta';

export const UserTopTierBox = () => {
  const router = useRouter();
  const { nickName } = router.query as IParamsNickName;

  const { useGetUserProfileQuery, useGetTopTierQuery } = useCaseUserProfile();
  const { useGetMatchDivisionMeta } = useCaseGetMetaData();

  const { data: userProfileData } = useGetUserProfileQuery(nickName);
  const { data: userTopTierData } = useGetTopTierQuery(
    userProfileData?.accessId || '',
  );

  const matchDivisionMetaQuery = useGetMatchDivisionMeta();

  if (matchDivisionMetaQuery.status === 'success') {
    const choiceOfficialAndCoachGameImageIndex = (
      matchDivisionCodes = [MATCH_META_DATA[2].matchtype],
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

    return (
      <S.TopTierWrap>
        <S.Flex>
          <S.FlexItem>
            <S.TopTierTitle>{MATCH_META_DATA[2].desc}</S.TopTierTitle>
            <S.TopTierImage>
              {rankIds.map((rankId, index) => (
                <ImageWithFallback
                  key={`${rankId}${index}`}
                  alt="티어아이콘"
                  layout="fill"
                  fallbackSrc={`https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank0.png`}
                  src={`https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank${rankId}.png`}
                  blurDataURL={`https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank${rankId}.png`}
                  placeholder="blur"
                />
              ))}
            </S.TopTierImage>
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

    @media ${({ theme }) => theme.media.small} {
      display: none;
    }
  `,
  TopTierImage: styled.div`
    position: relative;
    width: 9.5rem;
    height: 9.5rem;

    @media ${({ theme }) => theme.media.small} {
      width: 8rem;
      height: 8rem;
    }
  `,
  TopTierMode: styled.div`
    height: 30%;
    margin-top: 1.2rem;
    font-size: ${({ theme }) => theme.fontSizes.subTitle[20]};

    @media ${({ theme }) => theme.media.small} {
      display: none;
    }
  `,
};
