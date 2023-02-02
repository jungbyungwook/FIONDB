import { useRouter } from 'next/router';
import styled from 'styled-components';

import { ImageWithFallback } from 'src/components/common/Image/ImageWithFallback';
import { soccerImageDefaultSrc } from 'src/useCases/matchRecordCase';
import ProfileBackground from 'src/assets/svg/profile_background.svg';
import { useCaseUserProfile } from 'src/useCases/useCaseUserProfile';
import { useCaseStatisticsMatch } from 'src/useCases/useCaseStatisticsMatch';
import { getSoccerPlayerImageSrc } from 'src/util/getSoccerPlayerImageSrc';
import type { IParamsNickName } from 'src/components/player/UserProfile/UserProfileContainer';
import { DEVICE, DeviceType } from 'src/constants/device';

export const ProfileImageBox = () => {
  const router = useRouter();
  const { nickName } = router.query as IParamsNickName;
  const { searcherMostPlayerSpId } = useCaseStatisticsMatch(nickName);

  return (
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
  );
};

interface IProfileDataBoxProps {
  media: DeviceType;
}

export const ProfileDataBox = ({ media }: IProfileDataBoxProps) => {
  const router = useRouter();
  const { nickName } = router.query as IParamsNickName;
  const { useGetUserProfileQuery } = useCaseUserProfile();
  const { data: userProfileData } = useGetUserProfileQuery(nickName);

  const content =
    media === DEVICE.mobile ? (
      <>
        <S.TopTierText>최고등급 구해야함</S.TopTierText>
        <S.NickName>{userProfileData?.nickname}</S.NickName>
        <S.FlexItem>
          <S.Level>Lv. {userProfileData?.level}</S.Level>
          <S.Level>00 위</S.Level>
        </S.FlexItem>
      </>
    ) : (
      <>
        <S.NickName>{userProfileData?.nickname}</S.NickName>
        <S.Level>Lv. {userProfileData?.level}</S.Level>
        <S.Level>00 위</S.Level>
      </>
    );

  return <S.UserProfileDataWrap>{content}</S.UserProfileDataWrap>;
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

    @media ${({ theme }) => theme.media.small} {
      gap: 0.4rem;
    }
  `,
  TopTierText: styled.div`
    font-size: ${({ theme }) => theme.fontSizes.content[16]};
  `,
  NickName: styled.h4`
    margin: 0;
    @media ${({ theme }) => theme.media.small} {
      width: 17.5rem;
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
  FlexItem: styled.div`
    display: flex;
    gap: 1.6rem;
  `,
};
