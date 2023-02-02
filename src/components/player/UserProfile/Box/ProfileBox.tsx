import { useRouter } from 'next/router';
import styled from 'styled-components';

import { ImageWithFallback } from 'src/components/common/Image/ImageWithFallback';
import { soccerImageDefaultSrc } from 'src/useCases/matchRecordCase';
import ProfileBackground from 'src/assets/svg/profile_background.svg';
import { useCaseUserProfile } from 'src/useCases/useCaseUserProfile';
import type { IParamsNickName } from '../UserProfileContainer';
import { useCaseStatisticsMatch } from 'src/useCases/useCaseStatisticsMatch';
import { getSoccerPlayerImageSrc } from 'src/util/getSoccerPlayerImageSrc';

export const UserProfileBox = () => {
  const router = useRouter();
  const { nickName } = router.query as IParamsNickName;

  const { useGetUserProfileQuery } = useCaseUserProfile();
  const { data: userProfileData } = useGetUserProfileQuery(nickName);
  const { searcherMostPlayerSpId } = useCaseStatisticsMatch(nickName);

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
          layout="fill"
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

const S = {
  Section: styled.section`
    display: flex;
    width: 100%;
    gap: 2rem;
    padding: 3rem;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #31313c;
  `,
  UserProfileBox: styled.div`
    display: flex;
    align-items: center;
    width: 60rem;
    gap: 2rem;
  `,
  ImageWrap: styled.div`
    position: relative;
    overflow: hidden;
    width: 25rem;
    height: 20rem;

    @media ${({ theme }) => theme.media.small} {
      width: 20rem;
      height: 12rem;
    }
  `,
  BackgroundImageWrap: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `,
  UserProfileDataWrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    gap: 1rem;
    text-align: left;
  `,
  NickName: styled.h4`
    margin: 0;
    @media ${({ theme }) => theme.media.small} {
      font-size: ${({ theme }) => theme.fontSizes.subTitle[24]};
    }
  `,
  Level: styled.div`
    font-size: 1.5rem;

    @media ${({ theme }) => theme.media.small} {
      font-size: ${({ theme }) => theme.fontSizes.content[16]};
    }
  `,
  RefetchButton: styled.div`
    margin-top: 1rem;
  `,
};
