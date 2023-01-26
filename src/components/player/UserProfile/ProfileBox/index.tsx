import { useRouter } from 'next/router';

import { ImageWithFallback } from 'src/components/common/Image/ImageWithFallback';
import { soccerImageDefaultSrc } from 'src/useCases/matchRecordCase';
import ProfileBackground from 'src/assets/svg/profile_background.svg';
import { useStatisticsMatch } from 'src/hooks/useStatisticsMatch';
import { useCaseUserProfile } from 'src/useCases/useCaseUserProfile';
import { getSoccerPlayerImageSrc } from 'src/utils/getSoccerPlayerImageSrc';

import type { IParamsNickName } from '..';
import * as S from './style';

export const UserProfileBox = () => {
  const router = useRouter();
  const { nickName } = router.query as IParamsNickName;

  const { useGetUserProfileQuery } = useCaseUserProfile();
  const { data: userProfileData } = useGetUserProfileQuery(nickName);
  const { searcherMostPlayerSpId } = useStatisticsMatch(nickName);

  return (
    <S.UserProfileBox>
      <S.ImageWrap>
        <S.BackgroundImageWrap>
          <ProfileBackground />
        </S.BackgroundImageWrap>
        <ImageWithFallback
          key={searcherMostPlayerSpId}
          alt="user_profile_img"
          fallbackSrc={soccerImageDefaultSrc}
          src={getSoccerPlayerImageSrc(searcherMostPlayerSpId)}
          width={300}
          height={200}
          quality={100}
          placeholder="blur"
          blurDataURL={getSoccerPlayerImageSrc(searcherMostPlayerSpId)}
        />
      </S.ImageWrap>
      <S.UserProfileDataWrap>
        <S.NickName>{userProfileData?.nickname}</S.NickName>
        <S.Level>Lv. {userProfileData?.level}</S.Level>
        <S.Level>00 위</S.Level>
      </S.UserProfileDataWrap>
    </S.UserProfileBox>
  );
};
