import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { ImageWithFallback } from 'src/components/ui/Image/ImageWithFallback';
import {
  useGetMatchDivisionMeta,
  useGetMatchTypeMeta,
} from 'src/pages/api/hooks/useGetMetaQuery';
import { IUserProfile } from 'src/pages/api/hooks/query/useGetUserProfileQuery';
import { IMaxDivision } from 'src/pages/api/player/type';
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
      const { data: matchDivisionData } = matchDivisionMetaQuery.data;
      const filteredTopTierData = userTopTierData?.filter(
        ({ matchType }) => matchType === 50 || matchType === 52,
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
        <S.TopTierTitle>최고등급</S.TopTierTitle>
        <S.Flex>
          <div>
            <div>공식모드</div>
            <ImageWithFallback
              alt="공식모드티어아이콘"
              width={70}
              height={70}
              fallbackSrc={`https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank0.png`}
              src={`https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank${newState[0]}.png`}
            />
          </div>
          <div>
            <div>감독모드</div>
            <ImageWithFallback
              alt="감독모드티어아이콘"
              width={70}
              height={70}
              fallbackSrc={`https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank1.png`}
              src={`https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank${newState[1]}.png`}
            />
          </div>
        </S.Flex>
      </S.TopTierWrap>
    );
  }

  return <div>loading...</div>;
  // 티어 data를 가져와서 이미지를 보여줘야한다.
};

// const StyleTopTierWrap = styled.div`
//   height: 100%;
//   text-align: center;
// `;

// const StyleTopTierTitle = styled.div`
//   height: 30%;
//   font-size: 2rem;
// `;

// const StyleFlex = styled.div`
//   font-size: 1.5rem;
//   height: 70%;
//   display: flex;
// `;
