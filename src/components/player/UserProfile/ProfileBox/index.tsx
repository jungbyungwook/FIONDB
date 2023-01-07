import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';

import { OddsChart } from 'src/components/common/Chart/WinPercentChart';
import { RefetchButton } from 'src/components/common/RefetchButton';
import { ImageWithFallback } from 'src/components/ui/Image/ImageWithFallback';
import { IUserProfile } from 'src/pages/api/hooks/query/useGetUserProfileQuery';
import { soccerImageDefaultSrc } from 'src/useCases/matchRecordCase';
import { IParamsNickName } from '..';
// import { MatchRefetchButton } from '../../MatchRefetchButton';

import * as S from './style';

export const UserProfileBox = () => {
  const router = useRouter();
  const { nickName } = router.query as IParamsNickName;
  const queryClient = useQueryClient();
  const userProfileData = queryClient.getQueryData([
    'userProfile',
    nickName,
  ]) as IUserProfile;
  return (
    <S.UserProfileBox>
      <S.ImageWrap>
        <ImageWithFallback
          alt="user_profile_img"
          fallbackSrc={soccerImageDefaultSrc}
          src={soccerImageDefaultSrc}
          width={120}
          height={120}
        />
      </S.ImageWrap>
      <S.UserProfileDataWrap>
        <S.NickName>{userProfileData.nickname}</S.NickName>
        <S.Level>레벨 {userProfileData.level}</S.Level>
        <OddsChart
          data={[20, 2, 15]}
          top={<div>20전 19승 1패</div>}
          bottom={<div>20전 19승 1패</div>}
        />
        {/* <S.RefetchButton>
          <MatchRefetchButton
            accessId={userProfileData.accessId}
            text="전적 갱신"
          />
        </S.RefetchButton> */}
        <RefetchButton />
      </S.UserProfileDataWrap>
    </S.UserProfileBox>
  );
};
