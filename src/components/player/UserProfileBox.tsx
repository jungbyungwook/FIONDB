import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { IUserProfile } from 'src/pages/api/hooks/query/useGetUserProfileQuery';
import styled from 'styled-components';
import type { ParsedUrlQuery } from 'querystring';
import { ImageWithFallback } from '../ui/Image/ImageWithFallback';
import { soccerImageDefaultSrc } from 'src/useCases/matchRecordCase';
import {
  useGetMatchDivisionMeta,
  useGetMatchTypeMeta,
} from 'src/pages/api/hooks/useGetMetaQuery';
import { IMaxDivision } from 'src/pages/api/player/type';
interface IProps {
  accessId: string;
  nickName: string;
}
export const UserProfileContainer = ({ accessId, nickName }: IProps) => {
  return (
    <StyleSection>
      <UserTopTierBox />
      <UserProfileBox />
    </StyleSection>
  );
};

interface IParams extends ParsedUrlQuery {
  nickName: string;
}

const UserProfileBox = () => {
  const router = useRouter();
  const { nickName } = router.query as IParams;
  const queryClient = useQueryClient();
  const userProfileData = queryClient.getQueryData([
    'userProfile',
    nickName,
  ]) as IUserProfile;
  return (
    <StyleUserProfileBox>
      <StyleImageWrap>
        <ImageWithFallback
          alt="user_profile_img"
          fallbackSrc={soccerImageDefaultSrc}
          src={soccerImageDefaultSrc}
          width={120}
          height={120}
        />
      </StyleImageWrap>
      <StyleUserProfileDataWrap>
        <StyleNickName>{userProfileData.nickname}</StyleNickName>
        <StyleLevel>레벨 {userProfileData.level}</StyleLevel>
      </StyleUserProfileDataWrap>
    </StyleUserProfileBox>
  );
};

const StyleSection = styled.section`
  display: flex;
  width: 100%;
  height: 14rem;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #31313c;
`;

const StyleUserProfileBox = styled.div`
  display: flex;
  /* align-items: flex-end; */
  align-items: center;
  height: 100%;
`;
const StyleImageWrap = styled.div``;

const StyleUserProfileDataWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyleNickName = styled.div`
  font-size: 3rem;
`;

const StyleLevel = styled.div`
  font-size: 1.5rem;
`;

const UserTopTierBox = () => {
  const router = useRouter();
  const { nickName } = router.query as IParams;
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
      // const { data: matchTypeData } = matchTypeMetaQuery.data;
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

    return (
      <StyleTopTierWrap>
        <StyleTopTierTitle>최고등급</StyleTopTierTitle>
        <StyleFlex>
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
        </StyleFlex>
      </StyleTopTierWrap>
    );
  }

  return <div>loading...</div>;
  // 티어 data를 가져와서 이미지를 보여줘야한다.
};

const StyleTopTierWrap = styled.div`
  height: 100%;
  text-align: center;
  /* margin-bottom: auto 0; */
`;

const StyleTopTierTitle = styled.div`
  height: 30%;
  font-size: 2rem;
  /* height: 100%;/ */
  /* margin: auto 0; */
`;

const StyleFlex = styled.div`
  font-size: 1.5rem;
  height: 70%;
  display: flex;
`;
