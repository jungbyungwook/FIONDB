import { useGetUserAccessId } from 'hooks/useGetUserAccessId';
import useGetUserRecord from 'hooks/useGetUserRecord';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Layout } from 'src/components/Layout';
import TestMatchResultBox from 'src/components/player/TestMatchResultBox';
import styled from 'styled-components';

interface Query extends ParsedUrlQuery {
  nickName: string;
}
// InferGetServerSidePropsType<typeof getServerSideProps>
// 외부로 맡기면 여기는 무조근 nickName이 존재하는 상태일 것이다
const PlayerNickName: NextPage = (props) => {
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
      <Layout>
        <StyledScetion>
          {matchData?.map((matchId) => (
            <TestMatchResultBox matchId={matchId} nickName={nickName} />
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
      </Layout>
    );
  }

  return <Layout />;
};

// interface Query extends ParsedUrlQuery {
//   nickName: string;
// }
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // const queryClient = new QueryClient();
//   // await queryClient.prefetchQuery()\
//   // 더 좋은 방법은없을까..
//   const { nickName } = context.query as Query;
//   const { data: nickNameData } = useGetUserAccessId(nickName);
//   const {
//     userMatchQuery: { data: matchData, status: matchStatus },
//   } = useGetUserRecord(nickNameData?.accessId);

//   // const nicknName = context.params;
//   return {
//     props: {
//       matchData,
//     },
//   };
// };

const StyledScetion = styled.section`
  width: 80%;
  margin: 0 auto;
`;

export default PlayerNickName;
