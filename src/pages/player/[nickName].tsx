// import { useGetUserAccessId } from 'hooks/useGetUserAccessId';
// import useGetUserRecord from 'hooks/useGetUserRecord';
// import { useRouter } from 'next/router';
// import TestMatchResultBox from 'src/components/player/TestMatchResultBox';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { Layout } from 'src/components/Layout';
import { MatchResultBox } from 'src/components/player/MatchResultBox';
import { getBestPlayerNicknameBySpId } from 'src/pages/player/useCases/matchRecordCase';
import styled from 'styled-components';
import {
  useCustomInfiniteQuery,
  useCustomPrefetchInfiniteQuery,
} from '../api/hooks/query/useCustomInfiniteQuery';
import { useGetTopTierQuery } from '../api/hooks/query/useGetTopTierQuery';
import { useGetUserProfileQuery } from '../api/hooks/query/useGetUserProfileQuery';
import { IUserProfile } from '../api/hooks/query/useGetUserProfileQuery';

type PagePropsType = InferGetServerSidePropsType<typeof getServerSideProps>;
const Page = ({ nickName }: PagePropsType) => {
  const userProfileQuery = useGetUserProfileQuery(nickName);
  const topTierQuery = useGetTopTierQuery(userProfileQuery.data?.accessId);
  const matchListInfiniteQuery = useCustomInfiniteQuery(
    userProfileQuery.data?.accessId,
  );
  const soccerPlayerMetaQuery = useQuery(['soccerPlayerMeta'], () =>
    getBestPlayerNicknameBySpId(),
  );

  const fetchNextPageOnClick = () => matchListInfiniteQuery?.fetchNextPage();

  return (
    <Layout>
      <StyledScetion>
        <StyledUl>
          {matchListInfiniteQuery?.data?.pages.map((page, index) =>
            page.currentPageData.map((data) => (
              <MatchResultBox
                key={data.matchId}
                matchDetailData={data}
                nickName={nickName}
              />
            )),
          )}
        </StyledUl>
        <button onClick={fetchNextPageOnClick}>더 불러오기</button>
      </StyledScetion>
    </Layout>
  );
  // const router = useRouter();
  // const { nickName } = router.query as IParams;
  // const { data: nickNameData } = useGetUserAccessId(nickName);
  // const {
  //   userMatchQuery: { data: matchData, status: matchStatus },
  // } = useGetUserRecord(nickNameData?.accessId);

  // if (matchStatus === 'loading') return <div>Loading...</div>;
  // if (matchStatus === 'error')
  // return <div>존재하지 않는 감독이거나 전적이 없습니다.</div>;
  // if (matchStatus === 'success') {
  //   return (
  //     <Layout>
  //       <StyledScetion>
  //         {matchData?.map((matchId) => (
  //           <TestMatchResultBox matchId={matchId} nickName={nickName} />
  //         ))}
  //       </StyledScetion>
  //     </Layout>
  //   );
  // }

  return <Layout />;
};

interface IProps {
  nickName: string;
}
interface IParams extends ParsedUrlQuery {
  nickName: string;
}

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context,
) => {
  const { nickName } = context.query as IParams;
  const queryClient = new QueryClient();
  const prefetchUserProfileQuery = useGetUserProfileQuery(
    nickName,
    queryClient,
  );
  await prefetchUserProfileQuery();

  const { accessId } = queryClient.getQueryData([
    'userProfile',
    nickName,
  ]) as IUserProfile;
  await useCustomPrefetchInfiniteQuery(accessId, queryClient);

  return {
    props: {
      nickName: nickName,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
const StyledScetion = styled.section`
  width: 80%;
  margin: 0 auto;
`;

const StyledUl = styled.ul`
  display: grid;
  grid-row-gap: 3rem;
`;

export default Page;
