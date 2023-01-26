import styled from 'styled-components';

import { UserTopTierBox } from './Box/TopTierBox';
import { UserProfileBox } from './Box/ProfileBox';
import { ParsedUrlQuery } from 'querystring';
import { UserChartBox } from './Box/UserChartBox';
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
