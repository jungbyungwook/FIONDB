import { useGetUserAccessId } from 'hooks/useGetUserAccessId';
import useGetUserRecord from 'hooks/useGetUserRecord';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import TestMatchResultBox from 'src/components/player/TestMatchResultBox';
import styled from 'styled-components';

interface Query extends ParsedUrlQuery {
  nickName: string;
}

// 외부로 맡기면 여기는 무조근 nickName이 존재하는 상태일 것이다
const PlayerNickName: NextPage = () => {
  const router = useRouter();
  const { nickName } = router.query as Query;
  const { data: nickNameData } = useGetUserAccessId(nickName);
  const {
    userMatchQuery: { data: matchData, status: matchStatus },
  } = useGetUserRecord(nickNameData?.accessId);

  if (matchStatus === 'loading') return <div>Loading...</div>;
  if (matchStatus === 'error')
    return <div>존재하지 않는 감독이거나 전적이 없습니다.</div>;
  if (matchStatus === 'success') {
    return (
      <div>
        <StyledScetion>
          {matchData?.map((matchId) => (
            <TestMatchResultBox matchId={matchId} />
          ))}
          {/* <UserProfileBox
  //         nickName={nickName}
  //         rankList={userTopTierQuery?.data}
  //         level={userBaseProfile?.level}
  //       />
  //       {userMatchQuery.data?.map((matchId) => (
  //         <MatchResultBox matchId={matchId} />
  //       ))} */}
        </StyledScetion>
      </div>
    );
  }

  return <div></div>;
};

const StyledScetion = styled.section`
  width: 80%;
  margin: 0 auto;
`;

export default PlayerNickName;
