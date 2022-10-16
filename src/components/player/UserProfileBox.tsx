export {};
/*
// import HasLeftBottomBox from '../UI/box/HasLeftBottomBox';
import Image from 'next/image';
import GetPlayerRecordButton from './GetPlayerRecordButton';
import { UserTierRecord } from 'api/user/getUserTopTier';
import { FlexBox, FlexItem } from '@components';
import UserTopTierBox from './UserTopTierBox';
import styled from 'styled-components';

interface UserProfileBoxProps {
  nickName: string;
  rankList: UserTierRecord[] | undefined;
  level: number | undefined;
}

const UserProfileBox = ({
  nickName,
  rankList = [],
  level,
}: UserProfileBoxProps) => {
  return (
    <StyledContainer>
      <FlexBox style={{}}>
        <FlexItem style={{ flex: 4 }}>
          <UserTopTierBox />
        </FlexItem>
        <FlexItem style={{ flex: 6 }}>
          <FlexBox style={{}}>
            <FlexItem>asdf</FlexItem>
            <FlexItem>
              <FlexBox style={{ flexDirection: 'column' }}>
                <h3>{nickName}</h3>
                <div>lv: {level}</div>
                <div>
                  {rankList &&
                    rankList.map(({ matchType, division, achievementDate }) => (
                      <li key={achievementDate + division + matchType}>
                        {division}
                      </li>
                    ))}
                </div>
                <GetPlayerRecordButton />
              </FlexBox>
            </FlexItem>
          </FlexBox>
        </FlexItem>
      </FlexBox>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-color: white;
  width: 50%;
  height: 20rem;
  margin: 0 auto;
`;
// const;
export default UserProfileBox;
*/
