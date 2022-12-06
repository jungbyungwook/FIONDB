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
      <UserTopTierBox />
      <UserProfileBox />
    </StyleSection>
  );
};

const StyleSection = styled.section`
  display: flex;
  width: 100%;
  gap: 2rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #31313c;
`;
