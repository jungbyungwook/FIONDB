import styled from 'styled-components';

import { UserTopTierBox } from './TopTierBox';
import { UserProfileBox } from './ProfileBox';
import { ParsedUrlQuery } from 'querystring';
import { UserChartBox } from './UserChartBox';
import { RefetchButton } from 'src/components/common/Button/RefetchButton';

export interface IParamsNickName extends ParsedUrlQuery {
  nickName: string;
}

interface IProps {
  accessId: string;
  nickName: string;
}

export const UserProfileContainer = ({ accessId, nickName }: IProps) => {
  return (
    <S.Section>
      <UserProfileBox />
      <UserTopTierBox />
      <UserChartBox />
      <S.FlexItem alignSelf="end">
        <RefetchButton />
      </S.FlexItem>
    </S.Section>
  );
};

const S = {
  Section: styled.section`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 2rem;

    height: 28rem;
    padding: 4rem;
    border-radius: 1.6rem;

    color: white;
    background-color: ${({ theme }) => theme.colors.gray[900]};
  `,
  FlexItem: styled.div<{ alignSelf?: 'start' | 'center' | 'end' }>`
    align-self: ${({ alignSelf }) => alignSelf && alignSelf};
  `,
};

// export const Flex = styled.div`
//   display: flex;
//   align-items: flex-end;
//   gap: 3rem;
//   font-size: ${({ theme }) => theme.fontSizes.subTitle[18]};
// `;
