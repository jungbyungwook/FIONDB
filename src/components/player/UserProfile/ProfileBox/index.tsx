import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';

import { ImageWithFallback } from 'src/components/ui/Image/ImageWithFallback';
import { IUserProfile } from 'src/pages/api/hooks/query/useGetUserProfileQuery';
import { soccerImageDefaultSrc } from 'src/useCases/matchRecordCase';
import ProfileBackground from 'src/assets/svg/profile_background.svg';
import { IParamsNickName } from '..';

import * as S from './style';

export const UserProfileBox = () => {
  const router = useRouter();
  const { nickName } = router.query as IParamsNickName;
  const queryClient = useQueryClient();
  const userProfileData = queryClient.getQueryData([
    'userProfile',
    nickName,
  ]) as IUserProfile;

  // 최초 렌더링시에 딱 한번만 20경기 MVP들중에서 가장 많은 선수
  return (
    <S.UserProfileBox>
      <S.ImageWrap>
        <S.BackgroundImageWrap>
          <ProfileBackground />
        </S.BackgroundImageWrap>
        <ImageWithFallback
          alt="user_profile_img"
          fallbackSrc={soccerImageDefaultSrc}
          src={soccerImageDefaultSrc}
          width={320}
          height={200}
        />
      </S.ImageWrap>
      <S.UserProfileDataWrap>
        <S.NickName>{userProfileData.nickname}</S.NickName>
        <S.Level>Lv. {userProfileData.level}</S.Level>
        <S.Level>00 위</S.Level>
      </S.UserProfileDataWrap>
    </S.UserProfileBox>
  );
};

// 유저가 최근 20경기에서 가장 많이 플레이한 프로필이미지
// 전역상태로 만들면 어떨까?
