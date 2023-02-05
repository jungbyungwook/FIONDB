import styled from 'styled-components';
import { useAtomValue } from 'jotai';

import { UserTopTierBox } from './Box/TopTierBox';
import { UserChartBox } from './Box/UserChartBox';
import { ParsedUrlQuery } from 'querystring';
import { RefetchButton } from 'src/components/common/Button/RefetchButton';
import {
  ProfileImageBox,
  ProfileDataBox,
} from 'src/components/player/UserProfile/Box/ProfileBox';
import { DEVICE } from 'src/constants/device';
import { mediaAtom } from 'src/atoms/device';

export interface IParamsNickName extends ParsedUrlQuery {
  nickName: string;
}

interface IProps {
  accessId: string;
  nickName: string;
}

export const UserProfileContainer = ({ accessId }: IProps) => {
  const media = useAtomValue(mediaAtom);

  const pcUserProfileItems = [
    <S.UserProfileBox>
      <ProfileImageBox />
      <ProfileDataBox media={media} />
    </S.UserProfileBox>,
    <UserTopTierBox />,
    <UserChartBox />,
  ];
  const mobileUserProfileItems = [
    <ProfileImageBox />,
    <UserChartBox />,
    <UserTopTierBox />,
    <ProfileDataBox media={media} />,
  ];

  const userProfileItems =
    media === DEVICE.mobile ? mobileUserProfileItems : pcUserProfileItems;

  return (
    <S.Section>
      {userProfileItems.map((userProfileItem, index) => (
        <S.FlexItem key={index}>{userProfileItem}</S.FlexItem>
      ))}
      <S.FlexItem alignSelf="end">
        <RefetchButton accessId={accessId} />
      </S.FlexItem>
    </S.Section>
  );
};

const S = {
  Section: styled.section`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2rem;

    height: 28rem;
    padding: 4rem;
    border-radius: 1.6rem;

    color: white;
    background-color: ${({ theme }) => theme.colors.gray[900]};

    @media ${({ theme }) => theme.media.small} {
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      gap: 1.6rem;
      height: 33rem;
      padding: 1.6rem 2rem;
    }
  `,
  UserProfileBox: styled.div`
    width: 48rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  `,
  FlexItem: styled.div<{ alignSelf?: 'start' | 'center' | 'end' }>`
    align-self: ${({ alignSelf }) => alignSelf && alignSelf};
  `,
};
