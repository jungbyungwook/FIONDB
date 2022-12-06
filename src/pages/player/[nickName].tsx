import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styled from 'styled-components';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient } from 'react-query';
import { Layout } from 'src/components/Layout';
import { MatchResultBox } from 'src/components/player/MatchResultBox';
import { UserProfileContainer } from 'src/components/player/UserProfile';
import {
  useCustomInfiniteQuery,
  useCustomPrefetchInfiniteQuery,
} from '../api/hooks/query/useCustomInfiniteQuery';
import { useGetTopTierQuery } from '../api/hooks/query/useGetTopTierQuery';
import {
  useGetUserProfilePrefetchQuery,
  useGetUserProfileQuery,
} from '../api/hooks/query/useGetUserProfileQuery';
import { IUserProfile } from '../api/hooks/query/useGetUserProfileQuery';
import {
  metaQueryFunction,
  metaQueryKey,
  useGetSoccerPlayersMeta,
} from '../api/hooks/useGetMetaQuery';
import { useIntersectionObserver } from '../api/hooks/useIntersectionObserver';

// import * as S from './style';

type PagePropsType = InferGetServerSidePropsType<typeof getServerSideProps>;
const Page = ({ nickName }: PagePropsType) => {
  const userProfileQuery = useGetUserProfileQuery(nickName);
  // 여기서 useQuery를 이용해서 fetch 함수를 호출하고 내부 Component에서는 queryClient에 접근해서 getData만을 수행한다.
  const topTierQuery = useGetTopTierQuery(userProfileQuery.data?.accessId);
  const soccerPlayerMetaQuery = useGetSoccerPlayersMeta();
  const matchListInfiniteQuery = useCustomInfiniteQuery(
    userProfileQuery.data?.accessId,
  );
  const triggerRef = useIntersectionObserver(() =>
    matchListInfiniteQuery?.fetchNextPage(),
  );

  if (userProfileQuery.status === 'loading') return <div>loading...</div>;
  if (
    userProfileQuery.status === 'success' &&
    soccerPlayerMetaQuery.status === 'success'
  ) {
    return (
      <Layout>
        <StyleScetion>
          <div>
            <UserProfileContainer
              accessId={userProfileQuery.data?.accessId}
              nickName={nickName}
            />
          </div>
          <StyleUl>
            {matchListInfiniteQuery?.data?.pages.map((page) =>
              page.currentPageData.map((data) => (
                <li key={data.matchId}>
                  <MatchResultBox matchDetailData={data} nickName={nickName} />
                </li>
              )),
            )}
          </StyleUl>
          <StyleBottomWrap>
            <div ref={triggerRef}>
              {matchListInfiniteQuery?.isFetching ? 'loading' : ''}
            </div>
          </StyleBottomWrap>
        </StyleScetion>
      </Layout>
    );
  }

  return <Layout />;
};

interface IParams extends ParsedUrlQuery {
  nickName: string;
}

export const getServerSideProps: GetServerSideProps<IParams> = async (
  context,
) => {
  const { nickName } = context.query as IParams;
  const queryClient = new QueryClient();
  const prefetchUserProfileQuery = useGetUserProfilePrefetchQuery(
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

export const StyleScetion = styled.section`
  width: 80%;
  margin: 0 auto;
`;

export const StyleUl = styled.ul`
  display: grid;
  padding: 0;
  grid-row-gap: 1rem;
  list-style: none;
`;

export const StyleBottomWrap = styled.div`
  width: 100%;
  text-align: center;
  margin: 5rem 0;
`;

export default Page;
