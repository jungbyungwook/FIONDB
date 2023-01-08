import styled from 'styled-components';

import { UserTopTierBox } from './TopTierBox';
import { UserProfileBox } from './ProfileBox';
import { ParsedUrlQuery } from 'querystring';

export interface IParamsNickName extends ParsedUrlQuery {
  nickName: string;
}

interface IProps {
  accessId: string;
  nickName: string;
}

export const UserProfileContainer = ({ accessId, nickName }: IProps) => {
  return (
    <StyleSection>
      <UserProfileBox />
      <UserTopTierBox />
    </StyleSection>
  );
};

const StyleSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 2rem;

  height: 28rem;
  padding: 4rem;
  border-radius: 1.6rem;

  color: white;
  background-color: ${({ theme }) => theme.colors.gray[900]};
`;
