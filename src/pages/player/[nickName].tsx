import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { Layout } from 'src/components/Layout';
import { MatchResultBox } from 'src/components/player/MatchResultBox';
import { UserProfileContainer } from 'src/components/player/UserProfileBox';
// import { getBestPlayerNicknameBySpId } from 'src/pages/player/useCases/matchRecordCase';
import styled from 'styled-components';
import {
  useCustomInfiniteQuery,
  useCustomPrefetchInfiniteQuery,
} from '../api/hooks/query/useCustomInfiniteQuery';
import { useGetTopTierQuery } from '../api/hooks/query/useGetTopTierQuery';
import { useGetUserProfileQuery } from '../api/hooks/query/useGetUserProfileQuery';
import { IUserProfile } from '../api/hooks/query/useGetUserProfileQuery';
import {
  metaQueryFunction,
  metaQueryKey,
  useGetSoccerPlayersMeta,
} from '../api/hooks/useGetMetaQuery';

type PagePropsType = InferGetServerSidePropsType<typeof getServerSideProps>;
const Page = ({ nickName }: PagePropsType) => {
  const userProfileQuery = useGetUserProfileQuery(nickName);
  const topTierQuery = useGetTopTierQuery(userProfileQuery.data?.accessId);
  const matchListInfiniteQuery = useCustomInfiniteQuery(
    userProfileQuery.data?.accessId,
  );
  const soccerPlayerMetaQuery = useGetSoccerPlayersMeta();
  const fetchNextPageOnClick = () => matchListInfiniteQuery?.fetchNextPage();

  if (userProfileQuery.status === 'loading') return <div>loading...</div>;
  if (
    userProfileQuery.status === 'success' &&
    soccerPlayerMetaQuery.status === 'success'
  ) {
    return (
      <Layout>
        <StyledScetion>
          <div>
            <UserProfileContainer
              accessId={userProfileQuery.data?.accessId}
              nickName={nickName}
            />
          </div>
          <StyledUl>
            {matchListInfiniteQuery?.data?.pages.map((page) =>
              page.currentPageData.map((data) => (
                <MatchResultBox
                  key={data.matchId}
                  matchDetailData={data}
                  nickName={nickName}
                />
              )),
            )}
          </StyledUl>
          <StyleBottomWrap>
            <StyledButton onClick={fetchNextPageOnClick}>
              더 불러오기
            </StyledButton>
          </StyleBottomWrap>
        </StyledScetion>
      </Layout>
    );
  }
  return <Layout />;
};

// interface IProps {
//   nickName: string;
// }
interface IParams extends ParsedUrlQuery {
  nickName: string;
}

export const getServerSideProps: GetServerSideProps<IParams> = async (
  context,
) => {
  const { nickName } = context.query as IParams;
  const queryClient = new QueryClient();
  const prefetchUserProfileQuery = useGetUserProfileQuery(
    nickName,
    queryClient,
  );

  await prefetchUserProfileQuery();
  const userProfileData = queryClient.getQueryData([
    'userProfile',
    nickName,
  ]) as IUserProfile;

  if (!userProfileData) {
    return {
      redirect: {
        permanent: false,
        destination: '/player',
      },
    };
  }

  await useCustomPrefetchInfiniteQuery(userProfileData.accessId, queryClient);
  await queryClient.prefetchQuery(
    metaQueryKey.soccerPlayersMeta,
    () => metaQueryFunction.soccerPlayersMeta,
  );
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
  padding: 0;
  grid-row-gap: 1rem;
`;

const StyleBottomWrap = styled.div`
  width: 100%;
  text-align: center;
  margin: 5rem 0;
`;

const StyledButton = styled.button`
  width: 10rem;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 0.5rem;
  background-color: black;
  color: white;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default Page;
