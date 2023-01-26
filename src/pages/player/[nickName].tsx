import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styled from 'styled-components';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient } from 'react-query';

import { MatchResultBox } from 'src/components/player/MatchResultBox';
import { UserProfileContainer } from 'src/components/player/UserProfile/UserProfileContainer';
import {
  useMatchInfiniteQuery,
  usePrefetchMatchInfiniteQuery,
} from 'src/pages/api/hooks/query/useMatchInfiniteQuery';
import { useGetTopTierQuery } from 'src/pages/api/hooks/query/useGetTopTierQuery';
import {
  useGetUserProfilePrefetchQuery,
  useGetUserProfileQuery,
} from 'src/pages/api/hooks/query/useGetUserProfileQuery';
import { IUserProfile } from 'src/pages/api/hooks/query/useGetUserProfileQuery';
import {
  metaQueryFunction,
  metaQueryKey,
  useGetSoccerPlayersMeta,
} from 'src/pages/api/hooks/useGetMetaQuery';
import { useIntersectionObserver } from 'src/pages/api/hooks/useIntersectionObserver';
import { Layout } from 'src/components/common/Layout';

type PagePropsType = InferGetServerSidePropsType<typeof getServerSideProps>;
const Page = ({ nickName }: PagePropsType) => {
  const userProfileQuery = useGetUserProfileQuery(nickName);
  // 여기서 useQuery를 이용해서 fetch 함수를 호출하고 내부 Component에서는 queryClient에 접근해서 getData만을 수행한다.
  const topTierQuery = useGetTopTierQuery(userProfileQuery.data?.accessId);
  const soccerPlayerMetaQuery = useGetSoccerPlayersMeta();
  const matchListInfiniteQuery = useMatchInfiniteQuery(
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
        <S.Scetion>
          <div>
            <UserProfileContainer
              accessId={userProfileQuery.data?.accessId}
              nickName={nickName}
            />
          </div>
          <S.Ul>
            {matchListInfiniteQuery?.data?.pages.map((page) =>
              page.currentPageData.map((data) => (
                <li key={data.matchId}>
                  <MatchResultBox matchDetailData={data} nickName={nickName} />
                </li>
              )),
            )}
          </S.Ul>
          <S.BottomWrap>
            <div ref={triggerRef}>
              {matchListInfiniteQuery?.isFetching ? 'loading' : ''}
            </div>
          </S.BottomWrap>
        </S.Scetion>
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

  await usePrefetchMatchInfiniteQuery(userProfileData.accessId, queryClient);
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

export default Page;

export const S = {
  Scetion: styled.section`
    width: 108rem;
    margin: 0 auto;

    @media screen {
    }
  `,
  Ul: styled.ul`
    display: grid;
    padding: 0;
    grid-row-gap: 0.8rem;
    list-style: none;
  `,
  BottomWrap: styled.div`
    width: 100%;
    text-align: center;
    margin: 5rem 0;
  `,
};
