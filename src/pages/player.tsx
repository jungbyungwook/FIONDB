import { NextPage } from 'next';
import { useRecoilState, useRecoilValue } from 'recoil';
import nickNameState from 'state/userProfile';
import { useGetUserAccessId } from 'hooks/useGetUserAccessId';
import useGetUserRecord from 'hooks/useGetUserRecord';
// import UserProfileBox from 'src/components/player/UserProfileBox';
// import { MatchResultBox } from '@components';
import styled from 'styled-components';
import TestMatchResultBox from 'src/components/player/TestMatchResultBox';

const PlayerPage: NextPage = () => {
  const { nickName, accessId } = useRecoilValue(nickNameState);
  const { data: userBaseProfile, isLoading } = useGetUserAccessId(nickName);
  const { userMatchQuery } = useGetUserRecord(userBaseProfile?.accessId);

  // 리다이렉팅?
  return (
    <div>
      <StyledScetion>
        {userMatchQuery.data?.map((matchId) => (
          <TestMatchResultBox matchId={matchId} />
        ))}
        {/* <UserProfileBox
          nickName={nickName}
          rankList={userTopTierQuery?.data}
          level={userBaseProfile?.level}
        />
        {userMatchQuery.data?.map((matchId) => (
          <MatchResultBox matchId={matchId} />
        ))} */}
      </StyledScetion>
    </div>
  );
};

const StyledScetion = styled.section`
  width: 80%;
  margin: 0 auto;
`;

export default PlayerPage;
